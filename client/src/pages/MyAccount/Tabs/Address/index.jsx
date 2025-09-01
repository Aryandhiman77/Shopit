import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Collapse } from "react-collapse";
import AddressItem from "../../../../components/Reusables/Items/AddressItem";
import DataContext from "../../../../context/DataContext";

const Address = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const {addresses} = useContext(DataContext);
  return (
    <div>
      <div className="header p-5">
        <p className="text-gray-600 font-[600] text-[16px]">My Address</p>
      </div>
      <Divider />
      <div className="address-body p-4">
        <Collapse isOpened={isFormVisible}>
          <div className="flex justify-between px-4">
            <h1> Add Address</h1>
            <button
              onClick={() => setFormVisible(!isFormVisible)}
              className="hover:text-primary cursor-pointer"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <form action="" className="m-4 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="First name"
                variant="outlined"
                required={true}
                type={"text"}
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                type={"text"}
              />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="cpassword relative flex justify-end items-center w-1/2">
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                  type={"tel"}
                  required
                />
              </div>
              <TextField
                className="w-1/2"
                id="outlined-basic"
                label="Alternative Phone number"
                variant="outlined"
                type={"text"}
              />
            </div>
            <div className="password relative flex justify-end items-center">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Address Line 1"
                variant="outlined"
                required={true}
                // type={passwordHidden.pass ? "password" : "text"}
              />
            </div>
            <div className="cpassword relative flex justify-end items-center">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
              />
              <button
                type="button"
                className="absolute rounded-full text-black  p-2 mx-1 hover:bg-[#e5e5e5] active:bg-gray-300 transition-all ease-in-out duration-100 cursor-pointer"
              ></button>
            </div>
            <div className="flex flex-row gap-4">
              <TextField
                className="w-full"
                id="outlined-basic"
                label="State"
                variant="outlined"
                type={"text"}
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="City"
                variant="outlined"
                required={true}
                type={"text"}
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Postal Code"
                variant="outlined"
                required={true}
                type={"text"}
              />
            </div>
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Postal Code"
              variant="outlined"
              required={true}
              type={"text"}
            />
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Delivery instructions"
              variant="outlined"
              required={true}
              type={"text"}
            />
            <div className="flex gap-5 border-[1px] border-gray-300 p-4 rounded-lg">
              <p> Address Type</p>
              <label htmlFor="home" className="text-gray-600 font-[500]">
                {" "}
                <input
                  className="px-2"
                  name="address-type"
                  id="home"
                  type="radio"
                />{" "}
                Home{" "}
              </label>
              <label htmlFor="work" className="text-gray-600 font-[500]">
                {" "}
                <input
                  className="px-2"
                  name="address-type"
                  id="work"
                  type="radio"
                />{" "}
                Work{" "}
              </label>
            </div>

            <Button
              type="submit"
              className="btn !text-white !bg-primary hover:!bg-black !p-3"
            >
              Register
            </Button>
          </form>
        </Collapse>
        {!isFormVisible && (
          <div>
            <div
              onClick={() => setFormVisible(!isFormVisible)}
              className="add-address flex items-center justify-center border-[1px] border-[#a0a0a0] border-dashed p-5 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer text-sm font-[500] text-gray-600 w-full mb-5"
            >
              Add shipping address
            </div>
            {addresses?.map((item, i) => (
              <AddressItem address={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
