import ProductRow from "../../../Components/Table/ProductRow";
import Table from "../../../Components/Table";
<<<<<<< Updated upstream
import useData from "../../../Components/hooks/useData";
=======
import useCategory from "../../../Components/hooks/useCategory";
import useProducts from "../../../Components/hooks/useProducts";
import { useEffect } from "react";
>>>>>>> Stashed changes

const ProductList = ({ products }) => {
  const productTableHeadings = [
    "S.no",
    "Product ID",
    "Sku",
    "Product",
    "Categories",
    "sold by",
    "Variants",
    "Created at",
    "Modified at",
    "Status",
    "Operations",
  ];
  return (
    <>
      <Table attributes={productTableHeadings}>
        {products?.map((product, i) => (
          <ProductRow product={product} key={product?._id} index={i + 1} />
        ))}
      </Table>
    </>
  );
};

export default ProductList;
