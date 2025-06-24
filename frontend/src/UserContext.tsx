import React, { createContext, useState, useContext } from "react";

type User = {
    id: string;
    email: string;
    fullName: string;
} | null;

const UserContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser ] = useState<User>(null);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);