
import { createContext, useState } from 'react';
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [name,setName] = useState({name:"aryan"})
  return (
    <AuthContext.Provider value={name}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
