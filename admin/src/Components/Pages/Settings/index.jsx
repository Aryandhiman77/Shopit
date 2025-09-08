import React, { useState } from "react";
import {
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import ImageDropBox from "../../Reusables/ImageDropBox"; // Reuse your image uploader
import DropDownField from "../../Reusables/DropDownField";

const currencies = ["USD", "EUR", "INR", "GBP", "JPY"];
const timezones = ["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"];

const StoreSettings = () => {
  const [settings, setSettings] = useState({
    storeName: "",
    storeLogo: null,
    currency: "INR",
    taxIncluded: true,
    timezone: "Asia/Kolkata",
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved Store Settings:", settings);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-[700]">Store Settings</h1>
      <Divider />

      {/* Store Name */}
      <TextField
        label="Store Name"
        variant="outlined"
        size="small"
        value={settings.storeName}
        onChange={(e) => handleChange("storeName", e.target.value)}
        fullWidth
      />

      {/* Store Logo */}
      <div>
        <h2 className="text-lg font-[600] mb-2">Store Logo</h2>
        <ImageDropBox
          maxFiles={1}
          setImages={(files) => handleChange("storeLogo", files[0] || null)}
        />
      </div>

      {/* Currency */}
      <div className="flex flex-row gap-4">
        <DropDownField title={"Currency"} items={currencies} />
        <DropDownField title={"Time zone"} items={timezones} />
      </div>

      {/* Tax Included */}
      <FormControlLabel
        control={
          <Checkbox
            checked={settings.taxIncluded}
            onChange={(e) => handleChange("taxIncluded", e.target.checked)}
          />
        }
        label="Prices are tax inclusive"
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default StoreSettings;
