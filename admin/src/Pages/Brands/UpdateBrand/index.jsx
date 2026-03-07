import { useEffect } from "react";
import BrandForm from "../../../Components/BrandForm";
import Box from "../../../Components/Reusables/Elements/Box";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
import toast from "react-hot-toast";
import Spinner from "../../../Components/Reusables/Elements/Loader/Spinner";
import Modal from "../../../Components/Reusables/Elements/Modal";
const UpdateBrand = ({ brand = null, loading = false }) => {
  useEffect(() => {
    if (!brand) {
      toast.error("Brand not found.");
      return;
    }
  }, []);
  return (
    <>
      <div className="space-y-5">
        <BreadCrumb addBreadCrumb={["Update", brand?.name]} />
        <Box className="flex flex-col gap-2 bg-white! rounded-sm!">
          <div className="font-medium text-gray-500 text-lg py-3">
            Update Brand
          </div>
          <div className="mt-5">
            <BrandForm mode="edit" updationBrand={brand} />
          </div>
        </Box>
      </div>
      <Modal
        header={false}
        open={loading}
        fixedFullScreen={true}
        className="bg-[rgba(255,255,255,0.6)]! transition-all duration-200"
      >
        <div className="h-[100vh] flex justify-center items-center">
          <Spinner size={40} />
        </div>
      </Modal>
    </>
  );
};

export default UpdateBrand;
