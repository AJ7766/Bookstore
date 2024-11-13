import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProps } from "../models/UserModel";
import { fetchCookieAPI } from "../_services/fetchCookieAPI";

interface UserContextProps {
  user: UserProps | null;
  userAuthenticate: boolean;
  setUserAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchingCookie: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [userAuthenticate, setUserAuthenticate] = useState(false);
  const [fetchingCookie, setFetchingCookie] = useState(true);

  useEffect(() => {
    const fetchCookieData = async () => {
      try {
        setFetchingCookie(true);
        const { message, user } = await fetchCookieAPI();
        if(user){
          setUser(user);
          setUserAuthenticate(true);
        }
        console.log(message);
      } catch (error) {
        console.log(error);
        setUserAuthenticate(false);
      } finally {
        setFetchingCookie(false);
      }
    }
    fetchCookieData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userAuthenticate, setUserAuthenticate, fetchingCookie }}
    >
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
