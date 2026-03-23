import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DatePickerMui = ({ getValue = () => {}, label, name }) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    getValue(value);
  }, [value]);
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          name={name}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          referenceDate={"dd-mm-yyyy"}
          onAccept={(value) =>
            setValue(
              new Date(`${value.day()} ${value.month()} ${value.year()}`),
            )
          }
          slotProps={{ textField: { size: "small" } }}
          className="w-full"
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerMui;
