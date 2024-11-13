interface UserProps {
  username: string;
  password: string;
}
interface LoginFormProps {
  user: UserProps;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  loadingBtn: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginFormComponent({
  user,
  handleInputChange,
  message,
  loadingBtn,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="login-form-container">
      <img src="../images/bookstore-logo.png" />
      <div>{message ? <p>{message}</p> : <p>&nbsp;</p>}</div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
        </div>
        <div>
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
