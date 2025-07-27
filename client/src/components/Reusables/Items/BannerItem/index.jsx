import { Link } from "react-router-dom";

const BannerItem = ({ item }) => {
  
  return (
    <>
      <Link to={item.link} className="overflow-hidden block rounded-2xl">
        <img
          className="object-contain w-full hover:scale-105 duration-500"
          src={item?.img}
          alt="Banner image"
        />
      </Link>
    </>
  );
};

export default BannerItem;
