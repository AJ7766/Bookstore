import { useState } from "react";

export default function LoginForn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api`, {
        method: "GET",
        //body: JSON.stringify({ username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        const errorMessage = data.message || "Failed to login.";
        console.log(errorMessage);
        setError(true);
        setErrorMsg(errorMessage);
        throw new Error(errorMessage);
      }
      setError(false);
      window.location.href = `/${username}`;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login.";
      setErrorMsg(errorMessage);
      setError(true);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="login-form-container">
      <img src="../images/bookstore-logo.png" />
      <div className="h-10 flex items-center px-9">
        {error ? (
          <p className="loginTextMessage text-gray-500 text-center">
            {errorMsg}
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
