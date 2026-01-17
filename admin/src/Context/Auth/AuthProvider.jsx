import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(true);

  const login = () => {
    setAuthToken(true);
  };

  return (
    <AuthContext.Provider value={{ authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
