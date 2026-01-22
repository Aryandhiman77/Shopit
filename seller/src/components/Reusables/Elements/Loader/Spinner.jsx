const Spinner = ({ size = 40, color = "white", variation = "#f3642c" }) => {
  return (
    <div
      className="animate-[spin_0.6s_linear_infinite] rounded-full border-2 "
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: variation,
      }}
    />
  );
};

export default Spinner;
