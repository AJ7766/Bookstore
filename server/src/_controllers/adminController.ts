import { Request, Response } from 'express';
import { createAdminService, getAdminService, getUsersService } from '../_services/adminServices';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { assignCookieSession } from '../utils/sessions';
import { UserProps } from '../models/UserModel';

export const loginAdminController = async (req: Request, res: Response): Promise<any> => {
    const { username, password }: UserProps = req.body;

    try {
        const admin = await getAdminService(username);

        const isMatch = await comparePasswords(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid username or password.' });

        await assignCookieSession(req, admin._id);

        return res.status(200).json({ message: 'Login successful as Admin.' });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(403).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const createAdminController = async (req: Request, res: Response): Promise<any> => {
    const { name, username, password }: UserProps = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await createAdminService(name, username, hashedPassword);

        return res.status(201).json({ message: `Success registering admin, ${name}`, user: { name, username } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const getUsersController = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsersService();

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error getting list of users:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}