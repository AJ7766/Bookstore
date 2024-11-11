import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
    userAuthenticate: boolean;
    setUserAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the Provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userAuthenticate, setUserAuthenticate] = useState(false);

  return (
    <UserContext.Provider value={{ userAuthenticate, setUserAuthenticate }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserProvider");
  }
  return context;
};
