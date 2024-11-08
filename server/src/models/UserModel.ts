import mongoose, { Model, Schema, Document } from "mongoose";
import { SimplifiedBookProps } from "./BookModel";

export interface UserProps {
    _id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    password: string;
    totalSpent?: number;
    books: { book: mongoose.Types.ObjectId; quantity: number }[]
}

export interface UserPopulatedProps extends Omit<UserProps, 'books'> {
    books: SimplifiedBookProps[];
}

export interface UserWithQuantityProps {
    _id: mongoose.Types.ObjectId;
    quantity: number;
}

export interface RegisterUserProps {
    name: string;
    username: string;
    password: string;
}

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
    totalSpent: {
        type: Number,
        default: 0,
    },
    books: [
        {
            _id: false,
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
        },
    ],
}, { timestamps: true });

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);