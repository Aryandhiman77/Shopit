const GetRating = (rating) => {
  if (rating === 0 && rating <= 1) {
    return <div style={{ color: "red" }}>{rating} ★</div>;
  } else if (rating > 1 && rating <= 2) {
    return <div style={{ color: "orange" }}>{rating} ★</div>;
  } else if (rating > 2 && rating <= 3) {
    return <div style={{ color: "#f7cb05" }}>{rating} ★</div>;
  } else if (rating > 3 && rating <= 4) {
    return <div style={{ color: "#7ea000" }}>{rating} ★</div>;
  } else if (rating > 4 && rating <= 5) {
    return <div style={{ color: "green" }}>{rating} ★</div>;
  } else {
    return <></>;
  }
};
export default GetRating;
