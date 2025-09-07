import ProductRow from "../../../Table/ProductRow";
import Table from "../../../Table";
import { useData } from "../../../../Context/Data/DataContext";
const ProductList = () => {
  const productTableHeadings = [
    "",
    "Product ID",
    "Product",
    "Category(L1)",
    "SubCategory(L2)",
    "Leaf Category(L3)",
    "Sales",
    "Variants",
    "Created at",
    "Modified at",
    "Status",
    "Operations",
  ];
  const { products } = useData();
  return (
    <Table attributes={productTableHeadings}>
      {products?.map((product) => (
        <ProductRow product={product} key={product?.id} />
      ))}
    </Table>
  );
};

export default ProductList;
