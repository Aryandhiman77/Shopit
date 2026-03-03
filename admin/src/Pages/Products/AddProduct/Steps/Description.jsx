import React, { useEffect, useState } from "react";
import TinyEditor from "../../../../Components/Reusables/TinyEditor";

const Description = ({ setValue, defaultData }) => {
  const [description, setDescription] = useState(defaultData || "");
  useEffect(() => {
    setValue("description", description, { shouldValidate: true });
  }, [description]);
  return (
    <div className="mb-25!">
      <div className="font-medium text-gray-500 text-lg pb-4">
        Rich Description
      </div>
      <TinyEditor
        setValue={setDescription}
        defaultValue={defaultData.description}
      />
    </div>
  );
};

export default Description;
