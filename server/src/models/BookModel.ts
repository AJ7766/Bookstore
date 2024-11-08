import mongoose, { Model, Schema, Document } from "mongoose";

export interface BookProps {
    _id: mongoose.Types.ObjectId;
    title: string;
    price: number;
    stock: number;
    limited?: boolean;
    user: mongoose.Types.ObjectId[];
}


export interface SimplifiedBookProps {
    book: BookProps;
    quantity: number;
}

export interface BookDocument extends Document, BookProps {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId[];
}

export interface updateBookProps {
    _id?: mongoose.Types.ObjectId;
    title?: string;
    newTitle?: string;
    price?: number;
    stock?: number;
    limited?: boolean;
}

const bookSchema = new Schema<BookDocument>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    limited: {
        type: Boolean,
        default: false,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true });


export const BookModel: Model<BookDocument> = mongoose.models.Book || mongoose.model<BookDocument>('Book', bookSchema);