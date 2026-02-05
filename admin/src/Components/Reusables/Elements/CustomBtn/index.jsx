import { Button, CircularProgress, Box } from "@mui/material";
import Spinner from "../Loader/Spinner";

const CustomButton = ({
  type,
  loading,
  loadingColor,
  disabled,
  onClick,
  title,
  bg,
  textColor,
  marginBottom,
  fontWeight,
  textPadding,
  fontSize,
  imgSource,
  imgStyle,
  borderRadius,
  marginH,
  marginV,
  borderWidth,
  borderColor,
  icon,
  disabledOpacity,
  className,
}) => {
  return (
    <Button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        backgroundColor: bg || "#8858dc",
        color: textColor || "#fff",
        fontWeight: fontWeight || "bold",
        fontSize: fontSize || "14px",
        padding: textPadding || "10px 24px",
        borderRadius: borderRadius || 0,
        marginLeft: marginH || 0,
        marginRight: marginH || 0,
        marginTop: marginV || 0,
        marginBottom: marginV || marginBottom || "10px",
        border: borderWidth
          ? `${borderWidth}px solid ${borderColor || "black"}`
          : "none",
        opacity: disabled ? disabledOpacity || 0.4 : 1,
        textTransform: "none",
        "&:hover": {
          backgroundColor: bg || "#8858dc",
          opacity: 0.9,
        },
      }}
    >
      {loading ? (
        <Spinner size={22} color="#fff" />
      ) : icon ? (
        icon
      ) : imgSource ? (
        <Box
          component="img"
          src={imgSource}
          sx={imgStyle || { width: 20, height: 20 }}
        />
      ) : (
        title
      )}
    </Button>
  );
};

export default CustomButton;
