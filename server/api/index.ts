import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import adminRouter from '../src/_routes/adminRoutes';
import userRouter from '../src/_routes/userRoutes';
import session from 'express-session';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/database';
import cors from 'cors';

dotenv.config();
const app = express();

declare module 'express-session' {
    interface SessionData {
        user_id: mongoose.Types.ObjectId;
    }
}

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://jackies-bookstore.vercel.app'],
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}));


app.use('/api/admin', adminRouter);
app.use('/api', userRouter);

app.get('/api', (req, res) => {
    res.send('Welcome to the Bookstore API!');
});

connectDB()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection failed', error);
        process.exit(1);
    });

export default app;