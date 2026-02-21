import * as yup from "yup";

const basicProductInfo = yup.object({
  title: yup.string().required(),
  brand: yup.string().required(),
  categories: yup.array(yup.string()).required(""),
  shortDescription: yup
    .string()
    .max(200, "Descriptions must be less than 200 characters."),
  base_price: yup
    .number()
    .max(999999, "Price must be less than 999999")
    .required(),
  base_mrp: yup
    .number()
    .max(999999, "Price must be less than 999999")
    .required(),
  stock: yup.number().max(999999, "Stock must be less than 999999"),
  description: yup.string(),
  tags: yup.array(yup.string()).max(50),
});
