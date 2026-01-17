import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authToken = null;
  return (
    <AuthContext.Provider value={{ authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
