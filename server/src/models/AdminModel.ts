import mongoose, { Model, Schema } from "mongoose";

export interface AdminProps {
    name: string;
    username: string;
    password: string;
    messages?: string[];
}

export interface AdminRegisterProps extends AdminProps {
    key: string;
}

const adminSchema = new Schema<AdminProps>({
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
    messages: {
        type: [String],
    }
}, { timestamps: true });

adminSchema.index({ messages: 1 });

export const AdminModel: Model<AdminProps> = mongoose.models.Model || mongoose.model<AdminProps>('Admin', adminSchema);