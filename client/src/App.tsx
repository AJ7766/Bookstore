import LoginForn from "./_components/loginForm";
import UserDashboard from "./_components/userDashboard";
import "./App.css";
import { UserProvider } from "./context/useAuth";

function App() {
  return (
    <UserProvider>
      <div className="platform">
        <LoginForn />
        <UserDashboard />
      </div>
    </UserProvider>
  );
}

export default App;
