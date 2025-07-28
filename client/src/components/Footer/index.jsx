import { TbTruckDelivery } from "react-icons/tb";
import { PiKeyReturnDuotone } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { BsGift } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import  carte_bleue from "../../assets/carte_bleue.png"
import  visa from "../../assets/visa.png"
import  americanExpress from "../../assets/american_express.png"
import  masterCard from "../../assets/master_card.png"
import  paypal from "../../assets/paypal.png"

const FooterSection = () => {
  return (
    <div className="footer-container w-full px-4 md:px-8">
      <section className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 md:gap-4 py-10 ">
        <div className="box w-full sm:w-auto min-w-[200px] flex flex-col justify-center items-center gap-3 group">
          <TbTruckDelivery className="text-4xl group-hover:text-primary group-hover:-translate-y-1 transition-all duration-150" />
          <p className="font-[600]">Free Shipping</p>
          <p className="font-[400] text-sm text-center">
            For all Orders Over $100
          </p>
        </div>
        <div className="box w-full sm:w-auto min-w-[200px] flex flex-col justify-center items-center gap-3 group">
          <PiKeyReturnDuotone className="text-4xl group-hover:text-primary group-hover:-translate-y-1 transition-all duration-150" />
          <p className="font-[600]">Free Returns</p>
          <p className="font-[400] text-sm text-center">
            For an Exchange Product
          </p>
        </div>
        <div className="box w-full sm:w-auto min-w-[200px] flex flex-col justify-center items-center gap-3 group">
          <IoWalletOutline className="text-4xl group-hover:text-primary group-hover:-translate-y-1 transition-all duration-150" />
          <p className="font-[600]">Secure Payment</p>
          <p className="font-[400] text-sm text-center">
            Payment Cards Accepted
          </p>
        </div>
        <div className="box w-full sm:w-auto min-w-[200px] flex flex-col justify-center items-center gap-3 group">
          <BsGift className="text-4xl group-hover:text-primary group-hover:-translate-y-1 transition-all duration-150" />
          <p className="font-[600]">Special Gifts</p>
          <p className="font-[400] text-sm text-center">
            Our First Product Order
          </p>
        </div>
        <div className="box w-full sm:w-auto min-w-[200px] flex flex-col justify-center items-center gap-3 group">
          <RiCustomerService2Line className="text-4xl group-hover:text-primary group-hover:-translate-y-1 transition-all duration-150" />
          <p className="font-[600]">Support 24/7</p>
          <p className="font-[400] text-sm text-center">Contact us Anytime</p>
        </div>
      </section>
      <Divider />
      <section>
        <div class="footer flex px-3 lg:px-0 flex-col lg:flex-row py-8">
          <div class="part1 w-full lg:w-[25%] border-r border-[rgba(0,0,0,0.1)]">
            <h2 class="text-[18px] font-[600] mb-4">Contact us</h2>
            <p class="text-[13px] font-[400] pb-4">
              Shopit - Mega Super Store <br /> India, haryana - 133001
            </p>
            <Link
              class="link-footer text-[13px]"
              href="mailto:someone@example.com"
            >
              aryandhiman015@.com
            </Link>
            <span class="text-[22px] font-[600] block w-full mt-3 mb-5 text-primary">
              (+91) 80535 66803
            </span>
            <div class="flex items-center gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-[40px] text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M408 64H104a56.16 56.16 0 0 0-56 56v192a56.16 56.16 0 0 0 56 56h40v80l93.72-78.14a8 8 0 0 1 5.13-1.86H408a56.16 56.16 0 0 0 56-56V120a56.16 56.16 0 0 0-56-56z"
                ></path>
              </svg>
              <span class="text-[16px] font-[600]">
                Online Chat
                <br />
                Get Expert Help
              </span>
            </div>
          </div>
          <div class="part2  w-full lg:w-[40%] flex pl-0 lg:pl-8 mt-5 lg:mt-0">
            <div class="part2_col1 w-[50%]">
              <h2 class="text-[18px] font-[600] mb-4">Products</h2>
              <ul class="list">
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Prices drop
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    New products
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Best sales
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Contact us
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Sitemap
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div class="part2_col2 w-[50%]">
              <h2 class="text-[18px] font-[600] mb-4">Our company</h2>
              <ul class="list">
                <li class="list-none text-[14px] w-full mb-2">
                  <Link class="link-footer" to={"/"} data-discover="true">
                    Delivery
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Legal Notice
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Terms and conditions of use
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    About us
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Secure payment
                  </Link>
                </li>
                <li class="list-none text-[14px] w-full mb-2">
                  <Link className="link-footer" to={"/"} data-discover="true">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="part2  w-full lg:w-[35%] flex pl-0 lg:pl-8 flex-col pr-8 mt-5 lg:mt-0">
            <h2 class="text-[18px] font-[600] mb-2 lg:mb-4">
              Subscribe to newsletter
            </h2>
            <p class="text-[13px]">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <form class="mt-5 flex flex-col gap-y-2">
              <input
                type="text"
                class="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                placeholder="Your Email Address"
              />
              <div className="flex gap-3 items-center">
                <label className="checkbox">
                  <span>
                    <input type="checkbox" id="checkbox" />
                  </span>
                </label>
                <span>
                  {" "}
                  I agree to the terms and conditions and the privacy policy
                </span>
              </div>
              <div>
                <Button className="!bg-primary !text-white">SUBSCRIBE</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div class="bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-3 pb-[100px] lg:pb-3 bg-white">
        <div class="container flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
          <ul class="flex items-center gap-2">
            <li class="list-none">
              <Link
                class="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                href="/"
                target="_blank"
                data-discover="true"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 320 512"
                  class="text-[17px] group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </Link>
            </li>
            <li class="list-none">
              <Link
                class="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                href="/"
                target="_blank"
                data-discover="true"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  class="text-[21px] group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M960 509.2c0-2.2 0-4.7-.1-7.6-.1-8.1-.3-17.2-.5-26.9-.8-27.9-2.2-55.7-4.4-81.9-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 0 0-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2-37.1-1.4-76.8-2.3-116.5-2.8-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4-39.7.5-79.4 1.4-116.5 2.8-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0 0 82.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9-.3 9.7-.4 18.8-.5 26.9 0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6.1 8.1.3 17.2.5 26.9.8 27.9 2.2 55.7 4.4 81.9 3 36.1 7.4 66.2 13.4 88.8 12.8 47.9 50.4 85.7 98.3 98.5 28.2 7.6 83.7 12.3 161.7 15.2 37.1 1.4 76.8 2.3 116.5 2.8 13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4 39.7-.5 79.4-1.4 116.5-2.8 78-3 133.5-7.7 161.7-15.2 47.9-12.8 85.5-50.5 98.3-98.5 6.1-22.6 10.4-52.7 13.4-88.8 2.2-26.2 3.6-54 4.4-81.9.3-9.7.4-18.8.5-26.9 0-2.9.1-5.4.1-7.6v-5.6zm-72 5.2c0 2.1 0 4.4-.1 7.1-.1 7.8-.3 16.4-.5 25.7-.7 26.6-2.1 53.2-4.2 77.9-2.7 32.2-6.5 58.6-11.2 76.3-6.2 23.1-24.4 41.4-47.4 47.5-21 5.6-73.9 10.1-145.8 12.8-36.4 1.4-75.6 2.3-114.7 2.8-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8-71.9-2.8-124.9-7.2-145.8-12.8-23-6.2-41.2-24.4-47.4-47.5-4.7-17.7-8.5-44.1-11.2-76.3-2.1-24.7-3.4-51.3-4.2-77.9-.3-9.3-.4-18-.5-25.7 0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1.1-7.8.3-16.4.5-25.7.7-26.6 2.1-53.2 4.2-77.9 2.7-32.2 6.5-58.6 11.2-76.3 6.2-23.1 24.4-41.4 47.4-47.5 21-5.6 73.9-10.1 145.8-12.8 36.4-1.4 75.6-2.3 114.7-2.8 13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8 71.9 2.8 124.9 7.2 145.8 12.8 23 6.2 41.2 24.4 47.4 47.5 4.7 17.7 8.5 44.1 11.2 76.3 2.1 24.7 3.4 51.3 4.2 77.9.3 9.3.4 18 .5 25.7 0 2.7.1 5.1.1 7.1v4.8zM423 646l232-135-232-133z"></path>
                </svg>
              </Link>
            </li>
            <li class="list-none">
              <Link
                class="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                href="/"
                target="_blank"
                data-discover="true"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 384 512"
                  class="text-[17px] group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path>
                </svg>
              </Link>
            </li>
            <li class="list-none">
              <Link
                class="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                href="/"
                target="_blank"
                data-discover="true"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  class="text-[17px] group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </Link>
            </li>
          </ul>
          <p class="text-[13px] text-center mb-0">
            © 2024 - Ecommerce Template
          </p>
          <div class="flex items-center gap-1">
            <img src={carte_bleue} alt="image" />
            <img src={visa} alt="image" />
            <img src={masterCard} alt="image" />
            <img src={americanExpress} alt="image" />
            <img src={paypal} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
