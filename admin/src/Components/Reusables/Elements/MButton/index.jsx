import { Button } from "@mui/material";
import React from "react";

const MButton = ({ bg, textColor, startIcon, title = "button", endIcon,className }) => {
  return (
    <div>
      <Button
        className={`!w-full !text-gray-600 flex gap-2 !justify-start !capitalize !px-8 items-center ${className}`}
        style={{ background: bg, color: textColor }}
      >
        <div className="flex gap-2 items-center">
          {startIcon}
          <p>{title}</p>
        </div>
        <div className="ml-auto">{endIcon}</div>
      </Button>
    </div>
  );
};

export default MButton;
