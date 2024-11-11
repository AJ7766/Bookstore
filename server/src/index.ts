import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import adminRouter from './_routes/adminRoutes';
import userRouter from './_routes/userRoutes';
import session from 'express-session';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import MongoStore from 'connect-mongo';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

declare module 'express-session' {
    interface SessionData {
        user_id: mongoose.Types.ObjectId;
    }
}

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: 'none'
    },
    rolling: true,
    unset: 'destroy',
}));

app.use('/api/admin', adminRouter);
app.use('/api', (req, res, next) => {
    console.log("Cookie store:", req.sessionStore);
    next();
}, userRouter);

app.get('/api', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
        });
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection failed', error);
        process.exit(1);
    });

export default app;