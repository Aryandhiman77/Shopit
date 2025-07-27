import React, { useContext } from "react";
import BannerSlider from "../../components/Reusables/Sliders/BannerSlider";
import ItemSlider from "../../components/Reusables/Sliders/ItemSlider";
import iphone from "/Users/aryan/Desktop/Projects/e-comm images/iphonvar.jpg";
import fashion from "/Users/aryan/Desktop/Projects/e-comm images/pngegg.png";
import ScrollTab from "../../components/Reusables/ScrollTab";
import { DataContext } from "../../context/DataProvider";
import ProductItem from "../../components/Reusables/Items/ProductItem";
import CategoryItem from "../../components/Reusables/Items/CategoryItems";
import BannerItem from "../../components/Reusables/Items/BannerItem";
import RichBannerItem from "../../components/Reusables/Items/RichBanerItem";
import StaticBannerItem from "../../components/Reusables/Items/StaticBannerItem";

const Home = () => {
  const {
    categories,
    adsBannerData,
    adsMiniBannersData,
    miniSliderBannerData,
  } = useContext(DataContext);

  const popularCategories = [
    {
      name: "Fashion",
      image:
        "https://static.vecteezy.com/system/resources/previews/003/621/306/non_2x/beautiful-fashion-woman-in-sunglasses-stylish-girl-from-multicolored-paints-splash-of-watercolor-colored-drawing-realistic-illustration-of-paints-vector.jpg",
    },
    {
      name: "Electronics",
      image: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg",
    },
    {
      name: "Home & Furniture",
      image:
        "https://png.pngtree.com/png-clipart/20240811/original/pngtree-a-lamp-on-table-with-chair-png-image_15751370.png",
    },
    {
      name: "Sports",
      image:
        "https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg",
    },
    {
      name: "Grocery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwUNj-DZTMUW0XoNJZBFp3fQNr8hcO3sB-Qg&s",
    },
    {
      name: "Jwellery",
      image:
        "https://gravity-apps.com/cmspro/wp-content/uploads4953//2023/09/handcrafted-jewellery.jpg",
    },
    {
      name: "menwear",
      image: fashion,
    },
    {
      name: "smartphone",
      image: iphone,
    },
    {
      name: "smartphone",
      image: iphone,
    },
  ];
  const itemdata = {
    img: "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
    info: {
      subtitle: "Slimest, Fastest, Powerful",
      title: "Apple iPhone 15 Pro 128GB, titanium",
      priceLine: "Starting from",
      price: "₹59,999",
      btnlink:
        "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
      textColor: "black",
    },
  };
  return (
    <div className="wrapper">
      <section className="main-section bg-[#e7eaff]">
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
            spaceBetween={10}
            items={popularCategories}
            renderItem={(item) => <CategoryItem item={item} />}
          />
        </div>
      </section>
      <section className="product&banner-section bg-white p-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between ">
            <div>
              <p className="text-xl font-[600]">Featured Products</p>
              <p className="text-sm font-[400]">
                Don't miss the current offers until the end of Season.
              </p>
            </div>
            <ScrollTab items={categories} />
          </div>
          <div className="product-list mt-2">
            <ItemSlider
              slidesPerView={6}
              slidesPerGroup={4}
              spaceBetween={10}
              items={popularCategories}
              breakpoints={true}
              renderItem={(item) => (
                <ProductItem
                  item={item}
                  info={
                    "https://ayuvya.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fayuvya_images%2Fproduct_image%2Fnew_carousel_image_of_combos_with_free_shaker_15novmber_8.webp&w=640&q=75"
                  }
                />
              )}
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="banner-list w-[90%] mx-auto py-4 min-h-[20vh] -z-10">
          <ItemSlider
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={15}
            items={adsMiniBannersData}
            renderItem={(item, i) => <BannerItem key={i} item={item} />}
          />
        </div>
      </section>
      <section className="product&banner-section bg-white p-10 mx-auto">
        <div className="product-section">
          <div className="header-section flex justify-between ">
            <div>
              <p className="text-xl font-[600]">Trending Products</p>
              <p className="text-sm font-[400]">
                Don't miss the current offers until the end of Season.
              </p>
            </div>
            <ScrollTab items={categories} />
          </div>
          <div className="product-list mt-2">
            <ItemSlider
              slidesPerView={6}
              slidesPerGroup={4}
              spaceBetween={10}
              items={popularCategories}
              breakpoints={true}
              renderItem={(item) => (
                <ProductItem
                  item={item}
                  info={
                    "https://media-assets.hyperinvento.com/companies/c31a99fe-fc32-4275-a453-18c2131fef39/products/assetss/files/24094f7a2c2947f5b09b8cf913f088f1-product-assets.webp"
                  }
                />
              )}
            />
          </div>
        </div>
      </section>
      <section className="rich-banner-section">
        <div className="flex items-center p-10 gap-5">
          <div className="w-[65%]">
            <BannerSlider
              imageData={miniSliderBannerData}
              disableButtons={true}
              loop={true}
              fadeEffect={true}
              renderItem={(item) => <RichBannerItem bg={"white"} item={item} />}
            />
          </div>
          <div className="w-[28%] h-full flex flex-col gap-5">
            <div className="h-[55%]">
              <StaticBannerItem bg={"white"} item={itemdata} visible={true}/>
            </div>
            <div className="h-[50%]">
              <StaticBannerItem bg={"white"} item={itemdata} visible={true}/>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default Home;
