import mongoose from "mongoose";
import { UserModel, UserProps } from "../models/UserModel";
import { BookModel } from "../models/BookModel";


export const createUser = async (name: string, username: string, hashedPassword: string) => {
    return await UserModel.create({ name, username, password: hashedPassword });
}

export const getUser = async (user_id?: mongoose.Types.ObjectId, username?: string) => {
    return await UserModel.findById({ $or: [{ _id: user_id }, { username }] }).lean();
}

export const getUserBooks = async (user_id?: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id)
    .populate({
        path: 'books.book',
        model: BookModel,
        select: 'title price',
    })
    .lean() as UserProps;
}

export const checkBookExist = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId) => {
    return await UserModel.findOne(
        {
            _id: user_id,
            'books.book': book_id
        },
    ).lean();
}

export const incrementBookQuantity = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId, totalSpent: number) => {
    return await UserModel.findByIdAndUpdate(user_id,
        {
            $inc: { 'books.$[elem].quantity': 1 },
            $set: { totalSpent }
        },
        {
            new: true,
            arrayFilters: [{ 'elem.book': book_id }]
        }
    ).lean();
}

export const addBookToUser = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId, totalSpent: number) => {
    await UserModel.findByIdAndUpdate(user_id,
        {
            $addToSet: { books: { book: book_id, quantity: 1 } },
            $set: { totalSpent },
        },
        { new: true }
    ).lean();
}