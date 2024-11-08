import mongoose from "mongoose";
import { BookModel, BookProps } from "../models/BookModel";

export const getBook = async (title: string, book_id: mongoose.Types.ObjectId) => {
    return await BookModel.findOne({ $or: [{ _id: book_id }, { title }] }).lean();
}

export const updateBook = async (book: BookProps) => {
    return await BookModel.updateOne(
        { _id: book._id },
        { $set: { title: book.title, price: book.price, stock: book.stock, limited: book.limited } },
        { new: true }
    );
}

export const getAllBooks = async () => {
    return await BookModel.find({})
        .sort({ createdAt: -1 })
        .lean();
}

export const decrementBookStock = async (book_id: mongoose.Types.ObjectId, user_id: mongoose.Types.ObjectId) => {
    return await BookModel.findByIdAndUpdate(book_id,
        {
            $addToSet: { user: user_id },
            $inc: { stock: -1 }
        },
        { new: true }
    );
}