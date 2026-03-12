import { useRef, useState } from "react";
import ScrollTab from "../../../components/Reusables/ScrollTab";
import Divider from "@mui/material/Divider";
import ProgressBar from "../../../components/Reusables/ProgressBar";

import ReviewItem from "../../../components/Reusables/Items/ReviewItem";

const AdditionalProductInformation = ({
  richDescription,
  productDetails = "",
  reviews = "",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <ScrollTab
        disableLink={true}
        items={[
          { name: "Description" },
          { name: "Product Details" },
          { name: `Reviews (${1})` },
        ]}
        setActive={setActiveTab}
      />
      <Divider />

      <div className="text-gray-500 font-[300] text-[15px] border-2 m-3 border-[#e5e5e5] rounded-xl ">
        {activeTab === 0 && (
          <div
            className="rich-description p-5"
            dangerouslySetInnerHTML={{ __html: richDescription }}
          ></div>
        )}
        {activeTab === 1 && (
          <div className="specifications">
            <div className="font-[600] text-2xl p-4 text-gray-700">
              Specifications
            </div>
            <Divider />
            <div className="m-3">
              <div
                className="text-xl font-[500] p-2 text-gray-700"
                align="left"
              >
                General
              </div>
              <table className="w-[80%]">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Processor
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      {" "}
                      Apple Silicon A18 pro Chip
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Battery
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      5000 mah
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Dolby Atmos
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Charger in box
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      Not available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Divider />
            <div className="m-3">
              <div
                className="text-xl font-[500] p-2 text-gray-700"
                align="left"
              >
                Display
              </div>
              <table className="w-[80%]">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Display type
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      {" "}
                      LCD retina display 6.7"
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Brightness
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      5000 nits
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Divider />
            <div className="m-3">
              <div
                className="text-xl font-[500] p-2 text-gray-700"
                align="left"
              >
                Multimedia
              </div>
              <table className="w-[80%]">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px]">
                      Dolby Atmos
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px]">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-gray-600 font-[500] text-[15px] w-1/2">
                      Full HD PlayBack
                    </td>
                    <td className="px-2 py-1 text-gray-600 font-[600] text-[15px] w-1/2">
                      Yes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="rating-reviews">
            <div className="font-[600] text-2xl p-4 text-gray-700">
              Ratings & Reviews
            </div>
            <Divider />
            <div className="flex flex-row gap-5 items-center justify-around m-4">
              <div className="col-1 rating-review m-3">
                <div className="rating text-2xl">
                  4.7 <span className="text-black">★</span>
                </div>
                <div className="rating text-sm">4700 Ratings & 251 Reviews</div>
              </div>
              <div className="col-2 rating-count flex gap-1 flex-col w-[30%]">
                <div className="flex gap-3 items-center">
                  <div className="text-sm text-black">5★</div>
                  <ProgressBar color="#388e3c" max={100} value={80} />
                  <div>4,400</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-sm text-black">4★</div>
                  <ProgressBar color="#388e3c" max={100} value={60} />
                  <div>3000</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-sm text-black">3★</div>
                  <ProgressBar color="#388e3c" max={100} value={40} />
                  <div>300</div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-sm text-black">2★</div>
                  <ProgressBar color="#ff9f00" max={100} value={20} />
                  <div>40</div>
                </div>
                <div className="flex gap-3 items-center justify-center">
                  <div className="text-sm text-black ">1★</div>
                  <ProgressBar color="#ff6161" max={100} value={20} />
                  <div>40</div>
                </div>
              </div>
            </div>
            <Divider />
            <div className="reviews">
              <ReviewItem rating={4} />
              <ReviewItem rating={2} />
              <ReviewItem rating={3} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalProductInformation;
