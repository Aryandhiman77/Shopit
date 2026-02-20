import React, { useState } from "react";
import UserContext from "./UserContext";
import { fetchData } from "../../utilities/RequestAPI";
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    const response = await fetchData({
      url: "/admin/users",
    });
    if (response.success) {
      setUsers(response.data);
    }
    setLoading(false);
  };
  return (
    <UserContext.Provider value={{ getAllUsers, users, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
