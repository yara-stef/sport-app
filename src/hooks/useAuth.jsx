import React from "react";
import {logInWithEmailAndPassword, logout } from '../services/auth';
import { useNavigate,
  useLocation, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

let AuthContext = React.createContext(null);


export function useAuth() {
  return React.useContext(AuthContext);
}

function addMinutes(date, minutes) {
  const dateCopy = new Date(date);
  dateCopy.setMinutes(dateCopy.getMinutes() + minutes);

  return dateCopy;
}

export function RequireAuth({children}) {
  let auth = useAuth();
  let location = useLocation();
  const [cookies, setCookie] = useCookies(['user']);
  const token = cookies.Token;

  
  
  const signInTime = new Date(cookies.LastSignInTime);
  const expirationTime = addMinutes(signInTime, 10);
  

  const date = new Date();


  console.log("Expires at:", expirationTime);

  if(!token || date >= expirationTime ) {
    logInWithEmailAndPassword();
    return <Navigate to='/authentication' state={{from: location}} replace />

  } 
  
  return children;
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  let [user, setUser] = React.useState(null);
  const [cookies, setCookie] = useCookies(['user']);

  let signin = async (newUser) => {
    const credentials = await logInWithEmailAndPassword(newUser);
    if (credentials && credentials.user) {
      
      console.log(credentials);
      setUser(credentials.user); 
      setCookie('Token', credentials.user.accessToken, { path: '/', maxAge: 3600 });
      setCookie('LastSignInTime', credentials.user.metadata.lastSignInTime, { path: '/'});
      setCookie('Email', credentials.user.email, { path: '/'});
      console.log(cookies.Email);
      delete cookies.Password;
    return  navigate('/');      
    }
    
  };

  let signout = async () => {
    await logout();
    setUser(null);
    return navigate('/authentication');
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

 