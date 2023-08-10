/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

//Create context
const StateContext = createContext({
    //Default values
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    notification: null,
    setNotification: ()=>{},
})

//Distribute
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    //set timeinterval for notification
    const setNotification = (message) => {
      _setNotification(message);
      setTimeout(()=>{
        _setNotification('');
      }, 5000)
    };

    //set token function
    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);  //for signup & login
        } else {
            localStorage.removeItem('ACCESS_TOKEN');   //for logout
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification}}>
            {children}
        </StateContext.Provider>
    )
}

//Use context
export const useStateContext = () => useContext(StateContext);
