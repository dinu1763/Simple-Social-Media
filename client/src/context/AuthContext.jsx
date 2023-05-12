import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState('6432c6286edab4d57d2ac85a');

    let localToken = (localStorage.getItem('token'));
    let localUserId = (localStorage.getItem('userId'));

    if(localToken && localUserId && !token && !userId) {
        setToken(localToken);
        setUserId(localUserId);
    }

    const handleTokenChange = (value) => {
        setToken(value);
        localStorage.setItem('token', value);
    }

    const handleUserIdChange = (value) => {
        setUserId(value);
        localStorage.setItem('userId', value);
    }

    const handleLoginChange = (token, id) => {
        setUserId(id);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
    }

    return <AuthContext.Provider value={{token, userId, handleTokenChange, handleLoginChange, handleUserIdChange}}>{children}</AuthContext.Provider>
}