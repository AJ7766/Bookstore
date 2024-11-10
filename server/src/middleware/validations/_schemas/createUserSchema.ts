import { CreateUserProps } from "../../../models/UserModel";

export function createUserSchema(props: CreateUserProps) {
    const { name, username, password } = props;

    if (!name || !username || !password) {
        const missingFields = [];
        if (!name) missingFields.push('Name');
        if (!username) missingFields.push('Username');
        if (!password) missingFields.push('Password');

        console.error(`Please fill out ${missingFields.join(', ')}.`);
        return `Please fill out ${missingFields.join(', ')}.`;
    }
}