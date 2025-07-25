import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.css"
const ScrollTab = ({ items }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{ maxWidth: { xs: 320, sm: 780 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        
        aria-label="scrollable auto tabs example"
      >
        {items?.map((category,i) => (
          <Tab className="hover:!bg-[#f6eadf] hover:!text-primary " key={i} label={category.name} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ScrollTab;
