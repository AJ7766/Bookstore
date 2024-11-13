import UserComponent from "../_components/User";
import { useAuth } from "../context/useAuth";

export default function User() {
  const { user } = useAuth();
  return <UserComponent user={user || null} />;
}
