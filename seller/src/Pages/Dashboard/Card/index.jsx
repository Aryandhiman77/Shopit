import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import Box from "../../../components/Reusables/Elements/Box";

const Card = ({ startIcon, endIcon, title, value }) => {
  return (
    <Box className={" w-1/3 bg-white darkmode"}>
      <button className="flex justify-between gap-8 items-center w-full">
        <div className="flex items-center gap-4">
          {startIcon}
          <div className="text-start">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
        {endIcon}
      </button>
      <div className="h-px border-t border-dashed my-3 border-[#c3c2c2]"></div>
      <p className="text-gray-600 text-sm flex items-center gap-2">
        <span className="text-green-600 flex items-center gap-2">
          <BsGraphUpArrow className="text-lg" /> 54.3% Increased last month
          {/* <BsGraphDownArrow className="text-lg" /> 54.3% Increased last month */}
        </span>
      </p>
    </Box>
  );
};

export default Card;
