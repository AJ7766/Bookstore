import mongoose, { Model, Schema, Document } from "mongoose";
import { BookProps } from "./BookModel";

export interface UserProps {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    password: string;
    totalPrice?: number;
    books?: (BookWithQuantity | { book: BookProps; quantity: number })[]; 
}

export interface RegisterUserProps {
    name: string;
    username: string;
    password: string;
}

export interface BookWithQuantity {
    book: mongoose.Types.ObjectId;
    quantity: number;
}

const BookSchema = new Schema<BookWithQuantity>({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, default: null },
    quantity: { type: Number, required: true }
}, { _id: false });

interface UserDocument extends Document, UserProps {
    _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    books: [BookSchema],
}, { timestamps: true });

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);