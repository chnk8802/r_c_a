import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect( () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo)
        {
            setUser(userInfo);
        } else {
            navigate('/');
        }
    },[navigate]);

    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    );
}

export const userState = () => {
    return useContext(UserContext);
}