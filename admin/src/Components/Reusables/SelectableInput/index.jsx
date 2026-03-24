import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Spinner from "../Elements/Loader/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const SelectableInput = ({
  name,
  label,
  control,
  required,
  loading = false,
  options = [],
  multiple = false,
  defaultValue = { label: "", value: "" },
  disableCloseOnSelect = false,
  error,
  disableClearable = false,
  getValue = () => {},
  className,
}) => {
  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={
            multiple
              ? defaultValue?.length
                ? [...defaultValue]
                : []
              : defaultValue
          }
          render={({ field }) => (
            <Autocomplete
              {...field}
              disableCloseOnSelect={disableCloseOnSelect}
              options={options || []}
              multiple={multiple}
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
              className={`w-full ${className}`}
            />
          )}
        />
      ) : (
        <>
          <Autocomplete
            disableClearable={disableClearable}
            options={options || []}
            multiple={multiple}
            loading={loading}
            defaultValue={
              multiple ? (defaultValue?.length ? [...defaultValue] : []) : null
            }
            value={
              multiple ? (defaultValue?.length ? [...defaultValue] : []) : null
            }
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
            getOptionLabel={(option) => option?.label || ""}
            onChange={(_, data) => {
              getValue(data);
              setSelectedValues(data);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={label}
                required={required}
                error={!!error}
                helperText={error?.message}
                size="small"
              />
            )}
            size="small"
            className={`w-full ${className}`}
          />
        </>
      )}
    </>
  );
};

export default SelectableInput;
