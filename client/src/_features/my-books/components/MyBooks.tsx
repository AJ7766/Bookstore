import { UserPopulatedProps } from "../../../models/UserModel";

interface MyBooksListProps {
  user?: UserPopulatedProps;
  message: string;
};

export default function MybooksComponent({ user, message }: MyBooksListProps) {
  return (
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
        <p>No books available.</p>
      )}
    </div>
  );
}