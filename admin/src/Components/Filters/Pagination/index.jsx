import { Pagination, PaginationItem } from "@mui/material";
import "./style.css";
import { useEffect, useState } from "react";

const PaginationFilter = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    setCurrentPage()
  },[])
  return (
    <div className="p-4">
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </div>
  );
};

export default PaginationFilter;
