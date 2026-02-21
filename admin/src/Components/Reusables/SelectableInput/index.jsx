import { Autocomplete, Chip, MenuItem, TextField } from "@mui/material";
import Spinner from "../Elements/Loader/Spinner";

const SelectableInput = ({
  name,
  label,
  defaultValue,
  required,
  loading = false,
  options = [],
  getValue = () => {},
}) => {
  const setValue = (selectedOpts) => {
    const values = selectedOpts.map((item) => item.value);
    getValue(values);
  };
  return (
    <>
      <Autocomplete
        multiple
        className="w-full bg-white"
        name={name}
        variant="outlined"
        required={required}
        options={options.length ? [...options] : null}
        loading={loading}
        loadingText={"loading..."}
        renderInput={(params) => <TextField {...params} label={label} />}
        size="small"
        onChange={(_, selectedOpts) => setValue(selectedOpts)}
      />
    </>
  );
};

export default SelectableInput;
