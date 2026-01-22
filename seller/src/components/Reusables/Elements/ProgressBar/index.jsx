import React from "react";

const ProgressBar = ({ value }) => {
  // clamp value between 0 and 100
  const safeValue = Math.min(100, Math.max(0, value));

  // calculate step but clamp max to 9
  const step = Math.min(9, Math.floor(safeValue / 10));

  const colors = [
    "bg-red-500",    // 0–9%
    "bg-red-400",    // 10–19%
    "bg-orange-500", // 20–29%
    "bg-orange-400", // 30–39%
    "bg-yellow-500", // 40–49%
    "bg-yellow-400", // 50–59%
    "bg-lime-500",   // 60–69%
    "bg-green-500",  // 70–79%
    "bg-green-600",  // 80–89%
    "bg-green-700",  // 90–100%
  ];

  const color = colors[step];

  return (
    <div className="w-[100px] h-[10px] bg-[#e5e5e5] rounded-lg overflow-hidden">
      <span
        className={`block h-full transition-all duration-300 ${color}`}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

export default ProgressBar;
