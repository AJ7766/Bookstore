import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models/UserModel';

export const userAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user_id) 
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });

    try {
        const user = await UserModel.findById(req.session.user_id)

        if (!user)
            return res.status(401).json({ message: 'Unauthorized access. Please log in.' });

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }

    next();
};