import LoginForn from "./_components/loginForm";
import UserDashboard from "./_components/userDashboard";
import "./App.css";
import { useAuth } from "./context/useAuth";

function App() {
  const { userAuthenticate, fetchingCookie } = useAuth();
  return (
    <div className="platform">
      {fetchingCookie ? null : userAuthenticate ? (
        <UserDashboard />
      ) : (
        <LoginForn />
      )}
    </div>
  );
}

export default App;
