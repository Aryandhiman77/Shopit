import { createContext, useState } from "react";
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
  // const [name,setName] = useState({name:"aryan"})
  const [login, setLogin] = useState(false);
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
