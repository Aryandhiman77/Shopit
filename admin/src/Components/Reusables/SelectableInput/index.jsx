import { Autocomplete, Chip, MenuItem, TextField } from "@mui/material";
import Spinner from "../Elements/Loader/Spinner";

const SelectableInput = ({
  name,
  label,
  defaultValue,
  required,
  loading = false,
  options = [],
  multiple = true,
  getValue = () => {},
}) => {
  const setValue = (selectedOpts) => {
    if (!multiple) {
      getValue(selectedOpts.value);
      return;
    }
    const values =
      Array.isArray(selectedOpts) && selectedOpts.map((item) => item.value);
    getValue(values);
  };
  return (
    <>
      <Autocomplete
        multiple={multiple}
        className="w-full bg-white"
        name={name}
        variant="outlined"
        options={options.length ? [...options] : null}
        loading={loading}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        loadingText={"loading..."}
        renderInput={(params) => <TextField {...params} label={label} />}
        size="small"
        onChange={(_, selectedOpts) =>
          setValue(selectedOpts ? selectedOpts : "")
        }
      />
    </>
  );
};

export default SelectableInput;
