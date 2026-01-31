import React, { useContext } from "react";
import BannerSlider from "../../components/Reusables/Sliders/BannerSlider";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import iphone from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";
import fashion from "/Users/aryan/Desktop/Projects/e-comm images/pngegg.png";
import ScrollTab from "../../components/Reusables/ScrollTab";
import ProductItem from "../../components/Reusables/Items/ProductItem";
import CategoryItem from "../../components/Reusables/Items/CategoryItems";
import BannerItem from "../../components/Reusables/Items/BannerItem";
import RichBannerItem from "../../components/Reusables/Items/RichBanerItem";
import StaticBannerItem from "../../components/Reusables/Items/StaticBannerItem";
import StaticBannerSection from "./StaticBannerSection";
import DataContext from "../../context/data/DataContext";

const Home = () => {
  const {
    categories,
    adsBannerData,
    adsMiniBannersData,
    miniSliderBannerData,
    productsData,
    level1Categories,
  } = useContext(DataContext);
  console.log(level1Categories);

  const popularCategories = [
    {
      name: "Fashion",
      image:
        "https://static.vecteezy.com/system/resources/previews/003/621/306/non_2x/beautiful-fashion-woman-in-sunglasses-stylish-girl-from-multicolored-paints-splash-of-watercolor-colored-drawing-realistic-illustration-of-paints-vector.jpg",
      slug: "fashion",
    },
    {
      name: "Electronics",
      image: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg",
      slug: "electronics",
    },
    {
      name: "home-furniture", // lowercase, & is replaced with -
      image:
        "https://png.pngtree.com/png-clipart/20240811/original/pngtree-a-lamp-on-table-with-chair-png-image_15751370.png",
      slug: "Home-&-Furniture",
    },
    {
      name: "Sports",
      image:
        "https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg",
      slug: "sports",
    },
    {
      name: "Grocery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUNj-DZTMUW0XoNJZBFp3fQNr8hcO3sB-Qg&s",
      slug: "grocery",
    },
    {
      name: "Jwellery",
      image:
        "https://gravity-apps.com/cmspro/wp-content/uploads4953//2023/09/handcrafted-jewellery.jpg",
      slug: "jwellery",
    },
    {
      name: "menwear",
      image: fashion,
      slug: "menwear",
    },
    {
      name: "smartphone",
      image: iphone,
      slug: "smartphone",
    },
    {
      name: "smartphone",
      image: iphone,
      slug: "smartphone",
    },
  ];
  const staticBannerSectionData = [
    {
      img: "https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting at",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
        textColor: "black",
        horizontalTextAlignment: "left",
        verticalTextAlignment: "center",
      },
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting at",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
        textColor: "black",
        horizontalTextAlignment: "left",
        verticalTextAlignment: "center",
      },
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1751598649861_1737020916820_New_Project_52.jpg",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting at",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
        textColor: "black",
        horizontalTextAlignment: "right",
        verticalTextAlignment: "center",
      },
    },
    {
      img: "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting at",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
        textColor: "black",
        horizontalTextAlignment: "left",
        verticalTextAlignment: "center",
      },
    },
  ];
  return (
    <div className="wrapper">
      <section className="main-section bg-[#fbecf9d0]">
        <div className="w-[98%] mx-auto py-4 min-h-[20vh] -z-10">
          <BannerSlider
            fadeEffect={false}
            spaceBetween={10}
            imageData={adsBannerData}
            renderItem={(item) => <BannerItem item={item} />}
          />
        </div>
        <div className="w-[90%] mx-auto py-4 min-h-[20vh]">
          <ItemSlider
            breakpoints={true}
            spaceBetween={10}
            items={popularCategories}
            renderItem={(item) => <CategoryItem item={item} />}
          />
        </div>
      </section>
      <section className="popular-product-section bg-white p-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between ">
            <div>
              <p className="text-xl font-[600]">Featured Products</p>
              <p className="text-sm font-[400]">
                Don't miss the current offers until the end of Season.
              </p>
            </div>
            <ScrollTab items={level1Categories} />
          </div>
          <div className="product-list mt-2">
            <ItemSlider
              slidesPerView={6}
              slidesPerGroup={4}
              spaceBetween={10}
              items={productsData}
              breakpoints={true}
              renderItem={(item) => <ProductItem item={item} />}
            />
          </div>
        </div>
      </section>
      <section className="rich-banner-section">
        <div className="flex flex-col md:flex-col lg:flex-row p-4 md:p-10 gap-4 md:gap-5">
          <div className="w-full lg:w-[72%] space-y-2">
            <BannerSlider
              imageData={miniSliderBannerData}
              disableButtons={true}
              loop={true}
              fadeEffect={true}
              renderItem={(item) => <RichBannerItem bg="white" item={item} />}
            />
          </div>

          <div className="w-full lg:w-[25%] flex flex-col gap-4 sm:flex-row lg:flex-col">
            <StaticBannerItem
              key={"banneritem-1"}
              bg="white"
              item={staticBannerSectionData[0]}
              horizontalTextAlign="left"
              visible={true}
            />
            <StaticBannerItem
              key={"banneritem-2"}
              bg="white"
              item={staticBannerSectionData[0]}
              horizontalTextAlign="left"
              visible={true}
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="banner-list w-[90%] mx-auto py-4 min-h-[20vh] -z-10">
          <ItemSlider
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={15}
            items={adsMiniBannersData}
            renderItem={(item, i) => <BannerItem key={i} item={item} />}
          />
        </div>
      </section>
      <section className="latest-product-section bg-white pt-10 px-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between ">
            <div>
              <p className="text-xl font-[600]">Latest Products</p>
              <p className="text-sm font-[400]">
                Don't miss the current offers until the end of Season.
              </p>
            </div>
            <ScrollTab items={level1Categories} />
          </div>
          <div className="product-list mt-2">
            <ItemSlider
              slidesPerView={6}
              slidesPerGroup={4}
              spaceBetween={10}
              items={productsData}
              breakpoints={true}
              renderItem={(item) => <ProductItem item={item} />}
            />
          </div>
        </div>
      </section>
      <section className="trending-product-section bg-white pt-10 px-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between ">
            <div>
              <p className="text-xl font-[600]">Trending Products</p>
              <p className="text-sm font-[400]">
                Don't miss the current offers until the end of Season.
              </p>
            </div>
            {/* level 1 categories only*/}
            <ScrollTab items={level1Categories} />
          </div>
          <div className="product-list mt-2">
            <ItemSlider
              slidesPerView={6}
              slidesPerGroup={4}
              spaceBetween={10}
              items={productsData}
              breakpoints={true}
              renderItem={(item) => <ProductItem item={item} />}
            />
          </div>
        </div>
      </section>
      <div className="bg-white">
        <StaticBannerSection items={staticBannerSectionData} />
      </div>
    </div>
  );
};

export default Home;
