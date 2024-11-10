import { Request, Response, NextFunction } from 'express';
import { createUserSchema } from './_schemas/createUserSchema';
import { CreateUserProps } from '../../models/UserModel';

export const createUserValidation = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { name, username, password }: CreateUserProps = req.body;
    const validationResponse = createUserSchema({ name, username, password });

    if (typeof validationResponse === 'string') {
        return res.status(400).json({ message: validationResponse });
    }
    next();
};
