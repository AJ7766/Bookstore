import { Request } from 'express';
import mongoose from "mongoose";


export const assignCookieSession = async (req: Request, user_id: mongoose.Types.ObjectId) => {
    if (!req.session)
        throw new Error("Session is not available on the request object");


    return req.session.user_id = user_id;
}

export const checkCookieExist = async (req: Request) => {
    if (!req.session || !req.session.user_id)
        throw new Error("No active session found. User is not authenticated.");


    return req.session.user_id;
}