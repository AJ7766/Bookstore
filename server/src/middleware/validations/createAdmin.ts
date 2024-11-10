import { Request, Response, NextFunction } from 'express';
import { AdminRegisterProps } from "../../models/AdminModel";
import { createUserSchema } from './_schemas/createUserSchema';

export const createAdminValidation = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { name, username, password, key }: AdminRegisterProps = req.body;

    if (key !== process.env.ADMIN_REGISTER_KEY)
        return res.status(400).json({ message: "Error creating admin account." });


    const validationResponse = createUserSchema({ name, username, password });

    if (typeof validationResponse === 'string') {
        return res.status(400).json({ message: validationResponse });
    }
    next();
};
