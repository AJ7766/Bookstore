import mongoose from "mongoose";
import { createBook, decrementBookStock, getBook, getBooks, updateBook } from '../_repositories/bookRepository';
import { addRestockMessage, removeRestockMessage } from '../_repositories/adminRepository';
import { CreateBookProps, UpdateBookProps } from "../models/BookModel";

export const createBookService = async ({title, price, stock, limited}: CreateBookProps) => {
    const book = await createBook({title, price, stock, limited});

    if (!book)
        throw new Error('Creating book failed.');

    return book;
};

export const getBookService = async (title: string, book_id: mongoose.Types.ObjectId) => {
    const book = await getBook(title, book_id);
    if (!book)
        throw new Error("Book not found.");

    return book;
}

export const updateBookService = async ({_id, title, price, stock, limited}: UpdateBookProps) => {
    const updatedBook = await updateBook({_id, title, price, stock, limited});
    if (!updatedBook)
        throw new Error("Failed to update book.");

    return updatedBook;
}

export const getBooksService = async () => {
    const books = await getBooks();

    if (books.length === 0)
        throw new Error("No books found");

    return books
}

export const checkBookStockService = async (book_title: string, book_id: mongoose.Types.ObjectId, book_stock: number) => {
    const message = `Need to restock Book: ${book_title}:${book_id}`;

    if (book_stock <= 0) {
        await addRestockMessage(message);
        throw new Error("Book is out of stock.");
    }

    const removedBook = await removeRestockMessage(message);
    if (!removedBook)
        throw new Error("Removing restock message failed.");
};

export const decrementBookStockService = async (user_id: mongoose.Types.ObjectId, book_id: mongoose.Types.ObjectId) => {
    const book = await decrementBookStock(book_id, user_id);
    if (!book)
        throw new Error("Book stock update failed.");

    return book;
}
