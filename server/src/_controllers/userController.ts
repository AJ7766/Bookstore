import { Request, Response } from 'express';
import { UserModel, UserProps } from '../models/UserModel';
import mongoose from 'mongoose';
import { BookProps, } from '../models/BookModel';
import { decrementBookStockService, getBookService } from '../_services/bookServices';
import { addBookService, calculateUserSpent, createUserService, getUserBooksService, getUserService } from '../_services/userServices';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { assignCookieSession } from '../utils/sessions';
import { getUserBooks } from '../_repositories/userRepository';

export const createUserController = async (req: Request, res: Response): Promise<any> => {
    const { name, username, password }: UserProps = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await createUserService(name, username, hashedPassword)

        await UserModel.create({ name, username, password: hashedPassword });

        return res.status(201).json({ message: `Success registering ${name}`, user: { name, username } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const loginUserController = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    try {
        const user = await getUserService(undefined, username);

        const isMatch = comparePasswords(password, user.password);
        if (!isMatch)
            throw new Error('Invalid username or password.');

        await assignCookieSession(req, user._id);

        return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(403).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const addBookToUser = async (req: Request, res: Response): Promise<any> => {
    const { _id: book_id, title }: BookProps = req.body;
    const user_id = new mongoose.Types.ObjectId(req.session.user_id);

    try {
        const [user, book] = await Promise.all([
            getUserBooksService(user_id),
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

export const getAllUserBooks = async (req: Request, res: Response): Promise<any> => {
    const user_id = new mongoose.Types.ObjectId(req.session.user_id)

    try {
        const userBooks = await getUserBooks(user_id);

        return res.status(200).json({ userBooks });
    } catch (error) {
        console.error("Error getting user books:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}
