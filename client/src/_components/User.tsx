import { UserProps } from "../models/UserModel";

interface UserComponentProps {
    user: UserProps | null;
  }

export default function UserComponent({user}: UserComponentProps) {
  return (
    <div>
      <h1>Name: {user?.name}</h1>
      <h2>Username: {user?.username}</h2>
      <h2>Total Spent:{user?.totalSpent}</h2>
    </div>
  );
}
