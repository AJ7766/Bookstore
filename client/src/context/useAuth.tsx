import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  userAuthenticate: boolean;
  setUserAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchingCookie: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

// Create the Provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userAuthenticate, setUserAuthenticate] = useState(false);
  const [fetchingCookie, setFetchingCookie] = useState(true);
  const apiUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/get-cookie"
      : `${import.meta.env.VITE_API_URL}/api/get-cookie`;
  useEffect(() => {
    const cookie = document.cookie;

    const fetchData = async () => {
      try {
        console.log("Cookies before request:", cookie);
        setFetchingCookie(true);
        const res = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to retrieve cookie.");
        }
        setUserAuthenticate(true);
      } catch (error: unknown) {
        console.log(error);
        setUserAuthenticate(false);
      } finally {
        setFetchingCookie(false);
        console.log("Cookies from browser:", cookie);
      }
    };
    fetchData();
  }, [userAuthenticate, setUserAuthenticate, apiUrl]);

  return (
    <UserContext.Provider
      value={{ userAuthenticate, setUserAuthenticate, fetchingCookie }}
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
