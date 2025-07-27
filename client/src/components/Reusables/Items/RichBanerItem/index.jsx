import Button from "@mui/material/Button";
import "./style.css"

const RichBannerItem = ({
  img,
  topHeading = { fontSize: "16px", info: "Enter banner info" },
  description = { fontSize: "16px" },
  bg = "fff",
  top = "0",
  bottom = "40%",
  left = undefined,
  right = "5%",
}) => {
  return (
    <div
      className={`w-[60%] rounded-xl shadow-2xl mx-auto mt-9`}
      style={{ background: bg }}
    >
      <div className={`relative`}>
        <img
          className="rounded-xl"
          src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg"
          alt=""
        />
        <div
          className={`info absolute w-[50%] top-[0%] h-[100%] flex flex-col right-0 justify-center gap-y-3 overflow-hidden`}
        >
          <h3 className="relative text-xl font-[500] transition-all opacity-0 duration-700 -right-[80%]">Fastest, Slimest, Powerful</h3>
          <h1 className="relative text-3xl font-[500] transition-all opacity-0 duration-1000 -right-[80%]">
            Apple iPhone 15 Pro 128GB, titanium
          </h1>
          <p className="relative text-xl flex items-center transition-all opacity-0 -right-[80%]">Starting at only <span className="text-primary text-4xl font-bold px-3">₹45,999</span></p>
          <div className="relative transition-all opacity-0 -bottom-[20%]">
            <Button className="!bg-primary !text-white hover:bg-black">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichBannerItem;
