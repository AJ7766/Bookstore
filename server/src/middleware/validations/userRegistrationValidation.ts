import { Request, Response, NextFunction } from 'express';
import { registerValidation } from './_actions/registerValidation';
import { RegisterUserProps } from '../../models/UserModel';

export const userRegistrationvalidation = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { name, username, password }: RegisterUserProps = req.body;
    const validationResponse = registerValidation({ name, username, password });

    if (typeof validationResponse === 'string') {
        return res.status(400).json({ message: validationResponse });
    }
    next();
};
