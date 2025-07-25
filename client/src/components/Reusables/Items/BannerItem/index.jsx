import { Link } from "react-router-dom";

const BannerItem = ({ item }) => {
  console.log(item);
  return (
    <>
      <Link to={item.link}>
        <img
          className="object-contain w-full"
          src={item?.img}
          alt="Banner image"
        />
      </Link>
    </>
  );
};

export default BannerItem;
