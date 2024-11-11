import { useEffect, useState } from "react";
import { BookProps } from "../models/BookModel";
import { useAuth } from "../context/useAuth";

export default function UserDashboard() {
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [books, setBooks] = useState<BookProps>();
  const { userAuthenticate } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        //const res = await fetch(`${import.meta.env.VITE_API_URL}/api/my-books`,{
          const res = await fetch(`http://localhost:3000/api/my-books`, {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!res.ok) {
          const errorMessage = data.message || "Failed to retrieve books.";
          throw new Error(errorMessage);
        }
        setMessage(data.message);
        setBooks(data.books);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Failed to retrieve books."
        );
      } finally {
        setFetching(false);
        console.log(message);
      }
    };
    fetchData();
  }, [userAuthenticate, message]);
  console.log("msg",message);
  console.log("Auth:" , userAuthenticate)
  return fetching ? null : userAuthenticate ? (
    <h1>Not authenticated</h1>
  ) : (
    <div>
      <h1>{message}</h1>
      {books && books.price}
    </div>
  );
}
