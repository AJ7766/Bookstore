import { Request, Response } from 'express';
import { UserProps } from '../models/UserModel';
import mongoose from 'mongoose';
import { BookProps } from '../models/BookModel';
import { decrementBookStockService, getBookService } from '../_services/bookServices';
import { addBookService, calculateUserSpent, createUserService, getUserForLoginService, getUserPopulatedService, getUserService,  } from '../_services/userServices';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { assignCookieSession, checkCookieExist } from '../utils/sessions';

export const createUserController = async (req: Request, res: Response): Promise<any> => {
    const { name, username = req.body.username.toLowerCase(), password }: UserProps = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await createUserService(name, username, hashedPassword)

        return res.status(201).json({ message: `Success registering ${name}`, user: { name, username } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const loginUserController = async (req: Request, res: Response): Promise<any> => {
    const { username = req.body.username.toLowerCase(), password } = req.body;

    try {
        const user = await getUserForLoginService(username);
        console.log("user:",user)
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch)
            throw new Error('Invalid username or password.');

        await assignCookieSession(req, user._id);
        
        return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(403).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const addBookToUserController = async (req: Request, res: Response): Promise<any> => {
    const { _id: book_id, title }: BookProps = req.body;
    const user_id = new mongoose.Types.ObjectId(req.session.user_id);

    try {
        const [user, book] = await Promise.all([
            getUserPopulatedService(user_id),
            getBookService(title, book_id)
        ]);
        const totalSpent = await calculateUserSpent(book.price, user);

        const updatedUser = await addBookService(user_id, book.title, book._id, book.stock, totalSpent);

        const updatedBook = await decrementBookStockService(user_id, book._id);

        return res.status(200).json({ updatedUser, updatedBook });

    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(400).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
};

export const getUserBooksController = async (req: Request, res: Response): Promise<any> => {
    const user_id = new mongoose.Types.ObjectId(req.session.user_id)

    try {
        const populatedUser = await getUserPopulatedService(user_id);

        return res.status(200).json({ message: 'Successfully retrieving user books', user: populatedUser});
    } catch (error) {
        console.error("Error getting user books:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const checkUserAuthController = async (req: Request, res: Response): Promise<any> => {
    try {
        const user_id = await checkCookieExist(req);
        const user = await getUserService(user_id);

        return res.status(200).json({ message: 'Successfully retrieving cookie.', user});
    } catch (error) {
        console.error("Error getting cookie:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}