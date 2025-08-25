import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  height: theme.spacing(3),padding:2,margin:2,
  color: (theme.vars || theme).palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  "&:hover, &:focus": {
    backgroundColor: emphasize(theme.palette.grey[100], 0.06),
    ...theme.applyStyles?.("dark", {
      backgroundColor: emphasize(theme.palette.grey[800], 0.06),
    }),
  },
  "&:active": {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(theme.palette.grey[100], 0.12),
    ...theme.applyStyles?.("dark", {
      backgroundColor: emphasize(theme.palette.grey[800], 0.12),
    }),
  },
  ...theme.applyStyles?.("dark", {
    backgroundColor: theme.palette.grey[800],
  }),
}));

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnames = pathname.split("/").filter((x) => x);
  const pathIndex = pathnames.length - 1; //
  const navigateToPreviousLink = (index)=>{
    if(index!==0){
        return navigate(`/${pathname[index -1]}`);
    }
    navigate('/');
  }

  return (
    <div className="p-2 bg-[#e5e5e5] w-full">
    <nav aria-label="breadcrumb">
        <StyledBreadcrumb  label={"Home"}>Home</StyledBreadcrumb>
        {pathnames?.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
              <StyledBreadcrumb
              key={to}
                onDelete={pathIndex === index ? () => navigateToPreviousLink(index) : undefined}
                label={value}
                style={{textTransform:"capitalize"}}
              >
                <Link key={to} to={to}/>
              </StyledBreadcrumb>
          );
        })}
    </nav>
    </div>
  );
};

export default BreadCrumb;
