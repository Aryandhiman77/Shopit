import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DatePickerMui = ({ getValu, label }) => {
  const [value, setValue] = useState(null);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerMui;
