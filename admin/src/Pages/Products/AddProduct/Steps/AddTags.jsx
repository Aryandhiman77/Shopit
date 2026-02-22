import { TextField } from "@mui/material";
import Box from "../../../../Components/Reusables/Elements/Box";

const AddTags = () => {
  return (
    <Box className={"flex flex-col gap-4  bg-white"}>
      <h1 className="heading-1">Product Tags</h1>
      <TextField
        className="w-1/2"
        label="Product Slug"
        variant="outlined"
        required={true}
        size="small"
        type={"number"}
        // onChange={tagValue}
      />
      <div>
        <button className="custom-btn custom-shadow !bg-blue-500 !text-white text-sm">
          Add Tag
        </button>
      </div>
    </Box>
  );
};

export default AddTags;
