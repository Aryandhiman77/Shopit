import { Button } from "@mui/material";
import React from "react";

const MButton = ({ bg, textColor, startIcon, title = "button", endIcon }) => {
  return (
    <div>
      <Button
        className="!w-full !text-[rgba(0,0,0,0.80)] flex gap-2 !justify-start !capitalize !px-8 !text-sm items-center"
        style={{ background: bg, color: textColor }}
      >
        <div className="flex gap-2">
          {startIcon}
          <p className="font-[500]">{title}</p>
        </div>
        <div className="ml-auto">{endIcon}</div>
      </Button>
    </div>
  );
};

export default MButton;
