import { useState } from "react";
import { fetchLoginAPI } from "../_services/fetchLoginAPI";
import { useAuth } from "../context/useAuth";
import LoginFormComponent from "../_components/LoginForm";

export default function LoginFormContainer() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { setUserAuthenticate } = useAuth();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingBtn(true);
    const { message } = await fetchLoginAPI(user.username, user.password);
    setUserAuthenticate(true);
    setMessage(message);
    setLoadingBtn(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(user);
  };

  return (
    <LoginFormComponent
      user={user}
      handleInputChange={handleInputChange}
      message={message}
      loadingBtn={loadingBtn}
      onSubmit={onSubmit}
    />
  );
}
