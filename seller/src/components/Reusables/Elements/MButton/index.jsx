import { Button } from "@mui/material";
import Spinner from "../Loader/Spinner";

const MButton = ({
  bg,
  textColor,
  startIcon,
  title = "button",
  endIcon,
  className,
  onClick,
  loading,
  type,
}) => {
  return (
    <div>
      <Button
        type={type}
        className={`w-full! text-gray-500! flex gap-2 justify-start! capitalize! px-8! items-center ${className}`}
        style={{ background: bg, color: textColor }}
        onClick={onClick}
        disabled={loading || false}
      >
        {loading ? (
          <Spinner size={30} />
        ) : (
          <>
            <div className="flex gap-2 items-center">
              {startIcon}
              <p>{title}</p>
            </div>
            <div className="ml-auto">{endIcon}</div>
          </>
        )}
      </Button>
    </div>
  );
};

export default MButton;
