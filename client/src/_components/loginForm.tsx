import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function LoginForn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { setUserAuthenticate } = useAuth();

  const apiUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/login"
      : `${import.meta.env.VITE_API_URL}/api/login`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    const cookiesBeforeRequest = document.cookie;
    console.log("Cookies before request:", cookiesBeforeRequest);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.message || "Failed to login.";
        throw new Error(errorMessage);
      }
      const cookies = document.cookie;
      console.log("Cookies from browser:", cookies);
      setMessage(data.message);
      setUserAuthenticate(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to login.");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="login-form-container">
      <img src="../images/bookstore-logo.png" />
      <div className="h-10 flex items-center px-9">
        {message ? (
          <p className="loginTextMessage text-gray-500 text-center">
            {message}
          </p>
        ) : (
          <p className="text-white text-center">&nbsp;</p>
        )}
      </div>
      <form
        className="loginForm flex flex-col"
        data-testid="login-form"
        onSubmit={handleSubmit}
      >
        <div className="inputsContainer">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="buttonsContainer">
          <button
            type="submit"
            className={`blackBtn ${loadingBtn ? "blueBtnLoading" : ""}`}
            disabled={loadingBtn}
          >
            {loadingBtn ? "Logging in..." : "Login"}
          </button>
          <a href="/register">
            <button className="redBtn">Register</button>
          </a>
        </div>
      </form>
    </div>
  );
}
