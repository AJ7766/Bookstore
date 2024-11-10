import { createAdmin, getAdmin, getUsers } from "../_repositories/adminRepository";
import { AdminProps } from "../models/AdminModel";

export const getAdminService = async (username: string): Promise<AdminProps> => {
    const admin = await getAdmin(username);

    if (!admin)
        throw new Error('Admin not found');

    return admin;
};

export const createAdminService = async (name: string, username: string, hashedPassword: string) => {
    const admin = await createAdmin(name, username, hashedPassword);

    if (!admin)
        throw new Error("Failed to create admin.");

    return admin
}

export const getUsersService = async () => {
    const users = await getUsers();
    if (!users)
        throw new Error('Users not found');

    return users;
}