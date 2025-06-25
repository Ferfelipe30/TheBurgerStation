import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
    id: string;
    email: string;
    fullName: string;
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState ] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        setUserState(JSON.parse(storedUser));
        }
    }, []);

    // Guarda el usuario en localStorage cuando cambia
    const setUser = (user: User | null) => {
        setUserState(user);
        if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        } else {
        localStorage.removeItem("user");
        }
    };

    // Cierra sesión
    const logout = () => {
        setUser(null);
    };

    return(
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);