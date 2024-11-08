import { Request, Response } from 'express';
import { connectDB } from '../config/database';
import { BookModel, BookProps } from '../models/BookModel';
import { createAdminService, getAdminService, getUserListService } from '../_services/adminServices';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { assignCookieSession } from '../utils/sessions';
import { UserProps } from '../models/UserModel';

export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    try {
        const admin = await getAdminService(username);

        const isMatch = comparePasswords(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid username or password.' });

        await assignCookieSession(req, admin._id);

        return res.status(200).json({ message: 'Login successful as Admin.' });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

export const registerAdmin = async (req: Request, res: Response): Promise<any> => {
    const { name, username, password }: UserProps = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await createAdminService(name, username, hashedPassword);

        return res.status(200).json({ message: `Success registering admin, ${name}`, user: { name, username } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUserListService();

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error getting list of users:", error);
        return res.status(500).json({ message: "Internal server error.", error });
    }
}

export const addBook = async (req: Request, res: Response): Promise<any> => {
    const { title, price, stock, limited }: BookProps = req.body;

    try {
        await connectDB();
        const book = await BookModel.create({ title, price, stock, limited });
        return res.status(200).json({ message: `Success adding ${title}`, book });
    } catch (error) {
        console.error("Adding book error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}