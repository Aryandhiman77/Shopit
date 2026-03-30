import { Pagination, PaginationItem } from "@mui/material";
import "./style.css";
import { useEffect, useState } from "react";

const PaginationFilter = ({ totalPages, currentPage, getPage = () => {} }) => {
  const [active, setActive] = useState(currentPage || 1);
  const changePage = (page) => {
    setActive(page);
  };
  useEffect(() => {
    getPage(active);
  }, [active]);
  return (
    <div className="p-4 flex gap-2">
      <Pagination
        onChange={(e, page) => changePage(page)}
        count={totalPages || 10}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </div>
  );
};

export default PaginationFilter;
