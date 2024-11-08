import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRouter from './_routes/adminRoutes';
import userRouter from './_routes/userRoutes';
import session from 'express-session';
import mongoose from 'mongoose';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

declare module 'express-session' {
    interface SessionData {
        userId: mongoose.Types.ObjectId;
    }
}

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'strict'
    },
    rolling: true,
    unset: 'destroy',
}));

app.use('/admin', adminRouter);
app.use('/api', userRouter);

app.get('/api', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection failed', error);
        process.exit(1);
    });