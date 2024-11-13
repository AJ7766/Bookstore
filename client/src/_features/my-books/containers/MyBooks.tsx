import { useEffect, useState } from "react";
import { fetchBooksAPI } from "../services/fetchBooksAPI";
import { UserPopulatedProps } from "../../../models/UserModel";
import { useAuth } from "../../../context/useAuth";
import MybooksComponent from "../components/MyBooksComponent";

export default function MyBooks() {
  const [user, setUser] = useState<UserPopulatedProps | null>(null);
  const [message, setMessage] = useState("");
  const { setUserAuthenticate } = useAuth();

  useEffect(() => {
    async function fetchBooks() {
      const { message, data } = await fetchBooksAPI();
      setMessage(message);

      if (data) {
        setUser(data.user);
        setUserAuthenticate(true);
      }
    }
    fetchBooks();
  }, [setUserAuthenticate]);

  return <MybooksComponent user={user || null} message={message} />;
}
