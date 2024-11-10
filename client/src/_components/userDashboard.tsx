import { useEffect, useState } from "react";
import { BookProps } from "../models/BookModel";

export default function UserDashboard() {
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [books, setBooks] = useState<BookProps>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/my-books`,
          {
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
      }
    };
    fetchData();
  }, []);

  return fetching ? null : (
    <div>
      <h1>{message}</h1>
      {books && books.price}
    </div>
  );
}
