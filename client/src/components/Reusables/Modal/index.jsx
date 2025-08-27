import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Gallery from "../../../pages/ProductDetails/Gallery";
import ImageZoom from "../ImageZoom";
import { IoCloseCircle } from "react-icons/io5";


const ProductModal = ({ children, isModalOpen,setModalOpen }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
      className="flex h-full w-full bg-transparent items-center justify-center"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" min-h-[30%] max-w-[80%] bg-white flex flex-row p-4 rounded-2xl relative items-center">
           {children}
           <button className="p-2 rounded-full absolute top-0 right-0 cursor-pointer z-20" onClick={handleClose}>
            <IoCloseCircle className="text-5xl"/>
           </button>
        </div>
      </Modal>
    </div>
  );
};
export default ProductModal;
