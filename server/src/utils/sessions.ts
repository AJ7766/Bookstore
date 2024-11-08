import { Request } from 'express';
import mongoose from "mongoose";


export const assignCookieSession = async (req: Request, user_id: mongoose.Types.ObjectId) => {
    if (!req.session) {
        throw new Error("Session is not available on the request object");
    }
    req.session.userId = user_id;
}
