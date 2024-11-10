import mongoose from "mongoose";
import { UserModel, UserPopulatedProps, UserProps } from "../models/UserModel";
import { addBookToUser, checkBookExist, createUser, getUser, getUserBooks, incrementBookQuantity } from "../_repositories/userRepository";
import { checkBookStockService } from "./bookServices";
import { BookProps } from "../models/BookModel";

export const getUserForLoginService = async (user_id?: mongoose.Types.ObjectId, username?: string): Promise<UserProps> => {
    const user = await getUser(user_id, username);

    if (!user)
        throw new Error('Invalid username or password.');

    return user;
};

export const getUserService = async (user_id?: mongoose.Types.ObjectId, username?: string): Promise<UserProps> => {
    const user = await getUser(user_id, username);

    if (!user)
        throw new Error('User not found');

    return user;
};

export const getUserBooksService = async (user_id: mongoose.Types.ObjectId) => {
    const user = await getUserBooks(user_id);
    console.log("Populated books:", user?.books)
    if (!user)
        throw new Error('User not found');

    return user as unknown as BookProps;
}

export const calculateUserSpent = async (
    book_price: number,
    user: UserPopulatedProps,
) => {

    user.totalSpent += book_price;

    console.log("Total spent:", user.totalSpent);
    return user.totalSpent;
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
    const bookExists = await checkBookExist(user_id, book_id);

    return !!bookExists;
}

export const addBookService = async (user_id: mongoose.Types.ObjectId, book_title: string, book_id: mongoose.Types.ObjectId, book_stock: number, totalSpent: number) => {
    
    await checkBookStockService(book_title, book_id, book_stock);
    
    const bookExists = await checkBookExistService(user_id, book_id);
    console.log("Book Existence:", bookExists);
    let user;
    if (bookExists) {
        user = await incrementBookQuantity(user_id, book_id, totalSpent);
    } else {
        user = await addBookToUser(user_id, book_id, totalSpent);
    }
    return user
};

export const createUserService = async (name: string, username: string, hashedPassword: string) => {
    const user = await createUser(name, username, hashedPassword);

    if (!user)
        throw new Error("Adding book to user failed.");

    return user
}