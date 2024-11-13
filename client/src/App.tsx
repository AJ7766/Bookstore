import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/useAuth";
import MyBooksPage from "./pages/my-books";
import User from "./_containers/User";
import LoginForm from "./_containers/LoginForm";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { userAuthenticate, fetchingCookie } = useAuth();
  return !fetchingCookie ? userAuthenticate ? children : <LoginForm /> : null;
}

function App() {
  return (
    <div className="platform">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <MyBooksPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
