import mongoose from "mongoose";
import { BookModel, CreateBookProps, UpdateBookProps } from "../models/BookModel";

export const createBook = async ({ title, price, stock, limited }: CreateBookProps) => {
    return await BookModel.create({ title, price, stock, limited });
}

export const getBook = async (title: string, book_id: mongoose.Types.ObjectId) => {
    return await BookModel.findOne({ $or: [{ _id: book_id }, { title }] }).lean();
}

export const updateBook = async ({ _id, title, price, stock, limited }: UpdateBookProps) => {
    return await BookModel.findByIdAndUpdate(_id,
        { $set: { title, price, stock, limited } },
        { new: true }
    ).lean();
}

export const getBooks = async () => {
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
    ).lean();
}