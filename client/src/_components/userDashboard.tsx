import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { UserPopulatedProps } from "../models/UserModel";

export default function UserDashboard() {
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState<UserPopulatedProps>();
  const { userAuthenticate, setUserAuthenticate } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        //const res = await fetch(`${import.meta.env.VITE_API_URL}/api/my-books`,{
        const res = await fetch(`http://localhost:3000/api/my-books`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to retrieve books.");
        }
        console.log("Fetched data books", data.user);
        setMessage(data.message);
        setUser(data.user);
        setUserAuthenticate(true);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Failed to retrieve books."
        );
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [userAuthenticate, setUserAuthenticate]);

  return fetching ? null : !userAuthenticate ? (
    <h1>Not authenticated</h1>
  ) : (
    <div>
      <h1>{message}</h1>
      {user && user.books.length > 0 ? (
        <>
          <p>Total spent: {user.totalSpent}</p>
          {user.books.map((book, index) => (
            <div key={index}>
              <h2>{book.book.title}</h2>
              <p>Price: {book.book.price}</p>
              <p>Quantity: {book.quantity}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No books available.</p> // Show when there are no books
      )}
    </div>
  );
}
