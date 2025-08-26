import React, { useState } from "react";
import ScrollTab from "../../../components/Reusables/ScrollTab";
import Divider from "@mui/material/Divider";
import ProgressBar from "../../../components/Reusables/ProgressBar";

import ReviewItem from "../../../components/Reusables/ReviewItem";

const AdditionalProductInformation = ({
  richDescription,
  productDetails,
  reviews,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <ScrollTab
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
          <div className="rich-description p-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
            accusantium quos natus quia dignissimos itaque magnam ipsam
            perferendis odit? Voluptates perspiciatis totam expedita. Optio
            aliquam aut perferendis quos impedit dolore exercitationem, earum
            maiores iste blanditiis rerum? Eligendi dicta eveniet placeat quidem
            voluptate porro sit ex repellendus, sunt aperiam harum odit
            reiciendis tenetur? Ut eos tempora eveniet neque tempore nulla odio
            officiis quibusdam, quisquam, reiciendis velit repellendus
            perferendis harum, mollitia beatae eaque dignissimos facere hic
            omnis laudantium accusantium voluptatem officia. Itaque minus
            corrupti nam ullam repudiandae quos reiciendis suscipit libero
            incidunt totam facere maiores beatae, quam, distinctio maxime odit
            error! Fuga corporis doloremque voluptatem explicabo fugit cum
            possimus magnam corrupti assumenda dolores magni velit, quas fugiat
            quidem? Iste fuga officiis commodi obcaecati ipsum, quasi reiciendis
            quo sapiente. Sequi impedit architecto libero? Provident accusantium
            expedita, iure deserunt et asperiores quibusdam exercitationem aut
            odio, in cum possimus optio necessitatibus beatae recusandae,
            nesciunt aliquam. Necessitatibus cumque laudantium corporis expedita
            amet, veniam nesciunt excepturi. Sapiente distinctio doloribus nulla
            aut veniam, non molestiae fuga, iusto voluptas eius natus pariatur
            quibusdam laborum? Dolores accusantium quasi excepturi vitae autem
            fugit, molestiae, sunt mollitia, id exercitationem rerum a numquam
            unde? Repudiandae dolores itaque architecto quibusdam ab ratione
            deserunt, sapiente ex sit sunt molestias eligendi quasi mollitia
            optio perspiciatis. Assumenda voluptates delectus recusandae dolores
            nemo totam reprehenderit quae fuga? Aspernatur consectetur quam cum
            cupiditate in molestiae dolorem. Dolor ipsa similique deserunt
            accusamus accusantium!
          </div>
        )}
        {activeTab === 1 && (
          <div className="specifications">
            <div className="font-[600] text-2xl p-4 text-gray-700">
              Specifications
            </div>
            <Divider />
            <table className="m-3 w-[80%]">
              <th className="text-xl font-[500] p-2 text-gray-700" align="left">
                General
              </th>
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
            <Divider />
            <table className="w-[80%] m-3">
              <th className="text-xl font-[500] p-2 text-gray-700" align="left">
                Display
              </th>
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
            <Divider />
            <table className="w-[80%] m-3">
              <th className="text-xl font-[500] p-2 text-gray-700" align="left">
                Multimedia
              </th>
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
              <ReviewItem rating={4}/>
              <ReviewItem rating={2}/>
              <ReviewItem rating={3}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalProductInformation;
