import { Autocomplete, Chip, MenuItem, TextField } from "@mui/material";
import Spinner from "../Elements/Loader/Spinner";
import { useEffect } from "react";

const SelectableInput = ({
  name,
  label,
  defaultValue,
  required,
  loading = false,
  options = [],
  multiple = true,
  // onClick = () => {},
  getValue = () => {},
  error,
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
        // onClick={onClick}
        multiple={multiple}
        className={`w-full bg-white`}
        name={name}
        defaultValue={defaultValue}
        variant="outlined"
        options={options.length ? [...options] : []}
        loading={loading}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        loadingText={"loading..."}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            required={required}
            label={label}
            error={error}
            size="small"
          />
        )}
        size="small"
        onChange={(_, selectedOpts) =>
          setValue(selectedOpts ? selectedOpts : "")
        }
      />
    </>
  );
};

export default SelectableInput;
