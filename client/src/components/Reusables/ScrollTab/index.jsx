import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.css";
import { Link } from "react-router-dom";
import { SkeletonText } from "../Elements/Loader/skeleton";
const ScrollTab = ({
  items,
  setActive,
  orientation = "horizontal",
  bg = "white",
  loading = false,
  disableLink = false,
}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActive(newValue);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <SkeletonText width={"90%"} />
        </div>
      ) : (
        <Box sx={{ maxWidth: { xs: 320, sm: 780 } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            orientation={orientation}
            aria-label="scrollable auto tabs example"
          >
            {items?.map((item, i) => (
              <>
                {!disableLink ? (
                  <Link to={`/${item.slug}`}>
                    <Tab
                      className=" hover:!text-white hover:!bg-primary !capitalize"
                      key={`item-${item.slug}-${item.name}`}
                      label={item.name}
                    />
                  </Link>
                ) : (
                  <Tab
                    className=" hover:!text-white hover:!bg-primary !capitalize"
                    key={`item-${item.slug}-${item.name}`}
                    label={item.name}
                  />
                )}
              </>
            ))}
          </Tabs>
        </Box>
      )}
    </div>
  );
};

export default ScrollTab;
