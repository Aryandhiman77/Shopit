import { useContext } from "react";
import UserContext from "../../Context/Users/UserContext";

const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Users context must be inside user Provider.");
  }
  return context;
};

export default useUsers;
