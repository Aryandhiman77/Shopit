import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import buildQueryFromObject from "../../utilities/buildQueryFromObject";

const useFilters = () => {
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (value) => {
    setFilters((prev) => ({ ...prev, ...value }));
  };
  const resetFilters = () => {
    setFilters({});
  };
  const query = buildQueryFromObject(filters);
  useEffect(() => {
    setSearchParams(query);
  }, [filters]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    Object.keys(params).forEach((key) => {
      if (params[key].includes(",")) {
        params[key] = params[key].split(",");
      }
    });
    setFilters(params);
  }, []);

  return { filters, handleOnChange, resetFilters, searchParams, query };
};

export default useFilters;
