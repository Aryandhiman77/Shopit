import BrandForm from "../../../Components/BrandForm";
import Box from "../../../Components/Reusables/Elements/Box";
import BreadCrumb from "../../../Components/Reusables/Elements/BreadCrumb";
const AddBrand = () => {
  return (
    <div className="space-y-5">
      <BreadCrumb />
      <Box className="flex flex-col gap-2 bg-white! rounded-sm!">
        <div className="font-medium text-gray-500 text-lg py-3">Add Brand</div>
        <div className="mt-5">
          <BrandForm mode="add" />
        </div>
      </Box>
    </div>
  );
};

export default AddBrand;
