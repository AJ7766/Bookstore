import { createBookService, getBooksService, updateBookService } from "../_services/bookServices";
import { Request, Response } from 'express';
import { CreateBookProps, UpdateBookProps } from "../models/BookModel";
import mongoose from "mongoose";

export const createBookController = async (req: Request, res: Response): Promise<any> => {
    const { title, price, stock, limited }: CreateBookProps = req.body;

    try {
        const book = await createBookService({title, price, stock, limited});

        return res.status(200).json({ message: `Success creating ${title}`, book });
    } catch (error) {
        console.error("Creating book error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const getBooksController = async (req: Request, res: Response): Promise<any> => {
    try {
        const books = await getBooksService();

        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}

export const updateBookController = async (req: Request, res: Response): Promise<any> => {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    
    const { title, price, stock, limited }: UpdateBookProps = req.body;
    
    try {
        const updatedBook = await updateBookService({_id, title, price, stock, limited});

        return res.status(200).json({ message: `Success updating ${title}`, updatedBook });
    } catch (error) {
        console.error("Adding book error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
}