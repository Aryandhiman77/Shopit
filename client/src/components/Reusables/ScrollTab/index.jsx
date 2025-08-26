import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.css"
const ScrollTab = ({ items,setActive}) => {
  const [value, setValue] = useState(0);
  console.log(value)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActive(newValue);
  };

  return (
    <div className="w-full bg-white">
    <Box  sx={{ maxWidth: { xs: 320, sm: 780 } }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        
        aria-label="scrollable auto tabs example"
      >
        {items?.map((item,i) => (
          <Tab className="link hover:!text-primary " key={i} label={item?.name} />
        ))}
      </Tabs>
    </Box>
    </div>
  );
};

export default ScrollTab;
