export const getFixedDateAndTimeString = (string) => {
  if (!string) return "Please provide date string.";
  return new Date(string).toLocaleString("en-US", {
    month: "short",
    hour: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  });
};
