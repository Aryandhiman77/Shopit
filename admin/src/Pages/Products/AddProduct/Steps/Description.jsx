import React, { useState } from "react";
import TinyEditor from "../../../../Components/Reusables/TinyEditor";

const Description = ({}) => {
  return (
    <div className="mb-25!">
      <div className="font-medium text-gray-500 text-lg pb-4">Rich Description</div>
      <TinyEditor />
    </div>
  );
};

export default Description;
