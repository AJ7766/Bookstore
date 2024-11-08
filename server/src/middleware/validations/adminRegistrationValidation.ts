import { Request, Response, NextFunction } from 'express';

import { AdminRegisterProps } from "../../models/AdminModel";
import { registerValidation } from './_actions/registerValidation';

const admin_register_key = process.env.ADMIN_REGISTER_KEY;

export const adminRegistrationvalidation = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { name, username, password, key }: AdminRegisterProps = req.body;
    if (key !== admin_register_key)
        return res.status(400).json({ message: "Invalid username or password." });


    const validationResponse = registerValidation({ name, username, password });

    if (typeof validationResponse === 'string') {
        return res.status(400).json({ message: validationResponse });
    }
    next();
};
