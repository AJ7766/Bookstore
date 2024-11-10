import { Request, Response, NextFunction } from 'express';
import { AdminModel } from '../../models/AdminModel';

export const adminAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user_id) return res.status(401).json({ message: 'Unauthorized access. Please log in.' });

    try {
        const admin = await AdminModel.findById(req.session.user_id)

        if (!admin)
            return res.status(401).json({ message: 'Unauthorized access. Please log in.' });

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }

    next();
};