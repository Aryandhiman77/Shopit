import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Spinner from "../Elements/Loader/Spinner";

const SelectableInput = ({
  name,
  label,
  control,
  required,
  loading = false,
  options = [],
  multiple = true,
  error,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          options={options || []}
          loading={loading}
          value={field.value || (multiple ? [] : null)}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          getOptionLabel={(option) => option?.label || ""}
          onChange={(_, data) => field.onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              error={!!error}
              helperText={error?.message}
              size="small"
            />
          )}
          size="small"
          className="w-full bg-white"
        />
      )}
    />
  );
};

export default SelectableInput;