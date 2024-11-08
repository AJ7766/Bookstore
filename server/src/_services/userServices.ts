import mongoose from "mongoose";
import { UserModel, UserProps } from "../models/UserModel";
import { addBookToUser, checkBookExist, createUser, getUser, getUserBooks, incrementBookQuantity } from "../_repositories/userRepository";

export const getUserService = async (user_id?: mongoose.Types.ObjectId, username?: string): Promise<UserProps> => {
    const user = await getUser(user_id, username);

    if (!user)
        throw new Error('User not found');

    return user;
};

export const getUserBooksService = async (user_id: mongoose.Types.ObjectId) => {
    const user = await getUserBooks(user_id);
    if (!user)
        throw new Error('User not found');
    return user;
}

export const calculateUserSpent = async (user: UserProps, book_price: number) => {
    let totalSpent = user.books?.reduce((sum, { book, quantity }) => {
        if ('price' in book) {
            return sum + book.price * quantity;
        } else {
            return sum;
        }
    }, 0) ?? 0;

    totalSpent += book_price;

    if (totalSpent > 120) {
        throw new Error("You have purchased over 120$");
    }
    return totalSpent;
}


export const updateUserBooks = async (userId: string, bookId: string, totalPrice: number, quantity: number) => {
    return await UserModel.findByIdAndUpdate(userId,
        {
            $inc: { 'books.$[elem].quantity': quantity },
            $set: { totalPrice }
        },
        {
            new: true,
            arrayFilters: [{ 'elem.book': bookId }]
        }).lean();
};

export const checkBookExistService = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId) => {
    const book = await checkBookExist(user_id, book_id);

    if (!book)
        return false

    return true
}

export const addBookService = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId, totalSpent: number) => {
    const bookExists = await checkBookExistService(user_id, book_id);
    let user;
    if (bookExists) {
        user = await incrementBookQuantity(user_id, book_id, totalSpent);
    } else {
        user = await addBookToUser(user_id, book_id, totalSpent);
    }

    if (!user)
        throw new Error("Adding book to user failed.");

    return user
};

export const createUserService = async (name: string, username: string, hashedPassword: string) => {
    const user = await createUser(name, username, hashedPassword);

    if (!user)
        throw new Error("Adding book to user failed.");

    return user
}