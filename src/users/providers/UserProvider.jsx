import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, getUserFromToken } from '../services/tokenService';


const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(getUserFromToken())
    const [token, setToken] = useState(getToken())

    useEffect(() => {
        if (!user) {
            const localStorageUser = getUserFromToken()
            setUser(localStorageUser)
        }
    }, [user])

    const value = useMemo(
        () => ({ user, setUser, token, setToken }),
        [user, token]
    )

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useLocalStorageUser = () => {
    const context = useContext(UserContext);
    return context;
}

