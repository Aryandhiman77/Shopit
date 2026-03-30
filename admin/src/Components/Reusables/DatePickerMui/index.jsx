import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

const DatePickerMui = ({
  getValue = () => {},
  label,
  name,
  className,
  control,
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    getValue(value ? value.toDate() : null); // convert dayjs → JS Date
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              value={field.value}
              onChange={(newValue) => {
                setValue(newValue);
                field.value(newValue);
              }}
              slotProps={{ textField: { size: "small" } }}
              className="w-full"
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
};

export default DatePickerMui;
