import { getAllBooksService, updateBookService } from "../_services/bookServices";
import { Request, Response } from 'express';
import { BookProps } from "../models/BookModel";

export const getBooks = async (req: Request, res: Response): Promise<any> => {
    try {
        const books = await getAllBooksService();

        return res.status(200).json({ books });
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Internal server error.", error });
    }
}

export const updateBook = async (req: Request, res: Response): Promise<any> => {
    const { _id, title, price, stock, limited }: BookProps = req.body;

    try {
        const updatedBook = await updateBookService({_id, title, price, stock, limited});

        return res.status(200).json({ message: `Success updating ${title}`, updatedBook });
    } catch (error) {
        console.error("Adding book error:", error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}