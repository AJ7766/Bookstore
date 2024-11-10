import { AdminModel } from "../models/AdminModel";
import { UserModel } from "../models/UserModel";

export const getAdmin = async (username: string) => {
    return await AdminModel.findOne({ username }).lean();
}

export const createAdmin = async (name: string, username: string, hashedPassword: string) => {
    return await AdminModel.create({ name, username, password: hashedPassword });
}

export const getUsers = async () => {
    return await UserModel.find({})
        .select('name')
        .sort({ createdAt: -1 })
        .lean();
}

export const addRestockMessage = async (message: string) => {
    return await AdminModel.updateMany({}, { $addToSet: { messages: message } }).lean();
};

export const removeRestockMessage = async (message: string) => {
    return await AdminModel.updateMany({ messages: message }, { $pull: { messages: message } }).lean();
};
