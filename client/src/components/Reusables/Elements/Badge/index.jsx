const Badge = ({
  value,
  color = "bg-primary",
  icon = null,
  to = "/",
  size,
}) => {
  return (
    <>
      {size === 1 && (
        <div className="relative flex">
          <div
            className={` absolute rounded-full text-white text- font-semibold w-[40px] h-[40px] flex justify-center items-center -top-1 -right-3 border-2 border-white ${color} text-center`}
          >
            {value}
          </div>
          {icon}
        </div>
      )}
      {size === 2 && (
        <div className="relative">
          <div
            className={` absolute rounded-full text-white text-sm font-semibold w-[30px] h-[30px] flex justify-center items-center -top-1 -right-3 border-2 border-white ${color}`}
          >
            {value}
          </div>
          {icon}
        </div>
      )}
      {(size === 3 || !size) && (
        <div className="relative">
          <div
            className={` absolute rounded-full text-white text-sm font-semibold w-[20px] h-[20px] flex justify-center items-center -top-1 -right-3 border-2 border-white ${color}`}
          >
            {value}
          </div>
          {icon}
        </div>
      )}
    </>
  );
};

export default Badge;
