import React from "react";
import { IoIosGitCompare } from "react-icons/io";
import { Link } from "react-router-dom";
const Badge = ({value,color="bg-primary",icon=null,to="/"}) => {
  return(
    <Link to={to} className="relative">
      <div className={`badge ${color}`}>{value}</div>
      {icon}
    </Link>
  );
};

export default Badge;
