import { TextField } from "@mui/material";
import Box from "../../../../Components/Reusables/Elements/Box";
import FormError from "../../../../Components/Reusables/FormError";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddTags = ({ register, errors, setValue, defaultData }) => {
  const [tags, setTags] = useState(defaultData?.tags || []);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();

      const newTags = [...tags, input.trim()];
      let set = new Set(newTags);
      setTags([...set]);

      setValue("tags", [...set], { shouldValidate: true });

      setInput("");
    }
  };

  const deleteTag = (index) => {
    let newTags = tags.filter((tag, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Box className={"flex flex-col gap-4 bg-white mb-25!"}>
      <h1 className="heading-1">Product Tags</h1>

      {/* hidden register for RHF */}
      <input type="hidden" {...register("tags")} />

      <TextField
        className="w-1/2"
        label="Product Tags (Press enter to save tags)"
        variant="outlined"
        required
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <FormError error={errors?.tags?.message} />

      {/* Tag List */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md relative"
          >
            {tag}
            <button
              className="absolute -right-1 -top-1 bg-red-600 text-white! rounded-full cursor-pointer"
              type="button"
              onClick={(e) => deleteTag(index)}
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default AddTags;
