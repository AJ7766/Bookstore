import mongoose from "mongoose";
import { UserModel } from "../models/UserModel";
import { BookModel } from "../models/BookModel";


export const createUser = async (name: string, username: string, hashedPassword: string) => {
    return await UserModel.create({ name, username, password: hashedPassword });
}

export const getUser = async (user_id?: mongoose.Types.ObjectId, username?: string) => {
    return await UserModel.findOne({ $or: [{ _id: user_id }, { username }] }).select('-_id -password').lean();
}

export const getUserForLogin = async (username: string) => {
    return await UserModel.findOne({ username }).select('_id password').lean();
}

export const getPopulatedUser = async (user_id: mongoose.Types.ObjectId) => {
    return await UserModel.findById(user_id)
        .select('name username books totalSpent')
        .populate({
            path: 'books.book',
            model: BookModel,
            select: 'title price',
        }).lean();
}

export const checkBookExist = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId) => {
    return await UserModel.findOne(
        {
            _id: user_id,
            'books.book': book_id,
        }
    ).lean();
};

export const incrementBookQuantity = async (
    user_id: mongoose.Types.ObjectId,
    book_id: mongoose.Types.ObjectId,
    totalSpent: number
) => {
    return await UserModel.findOneAndUpdate(
        {
            _id: user_id,
            'books.book': book_id
        },
        {
            $inc: { 'books.$[elem].quantity': 1 },
            $set: { totalSpent },
        },
        {
            arrayFilters: [
                { 'elem.book': book_id }
            ],
            new: true
        }
    ).lean();
};

export const addBookToUser = async (
    user_id: mongoose.Types.ObjectId,
    book_id: mongoose.Types.ObjectId,
    totalSpent: number
) => {
    return await UserModel.findByIdAndUpdate(
        user_id,
        {
            $set: { totalSpent },
            $push: {
                books: {
                    book: {
                        _id: book_id,
                        quantity: 1
                    }
                }
            }
        },
        {
            new: true
        }
    ).lean();
};
