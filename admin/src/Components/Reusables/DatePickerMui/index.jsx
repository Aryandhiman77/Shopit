import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerMui = ({ getValue = () => {}, label, name, className }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    getValue(value ? value.toDate() : null); // convert dayjs → JS Date
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{ textField: { size: "small" } }}
          className="w-full"
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerMui;
