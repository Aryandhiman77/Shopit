import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(true); 

  return (
    <AuthContext.Provider value={{login}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
