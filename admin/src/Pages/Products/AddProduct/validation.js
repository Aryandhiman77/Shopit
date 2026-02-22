import * as yup from "yup";

export const basicProductInfo = yup
  .object({
    title: yup.string().required("Product title is a required field."),
    brand: yup.string().required("Brand is a required field."),
    categories: yup.array(yup.string()),
    subCategories: yup.array(yup.string()),
    leafCategories: yup.array(yup.string()),
    shortDescription: yup
      .string()
      .max(200, "Descriptions must be less than 200 characters."),
    base_price: yup
      .number()
      .typeError("Selling Price must be a number.")
      .max(999999, "Selling Price must be less than 999999")
      .required("Selling Price is a required field."),
    base_mrp: yup
      .number()
      .typeError("MRP must be a number.")
      .max(999999, "MRP must be less than 999999")
      .required("MRP is a required field."),

    tags: yup.array(yup.string()).max(50),
  })
  .test({
    name: "check-categories",
    test: function (value, context) {
      const totalCategories =
        value.categories?.length ||
        0 + value.subCategories?.length ||
        0 + value.leafCategories?.length ||
        0;
      if (totalCategories < 1) {
        return context.createError({
          path: "categories",
          message: "Select atleast one category.",
        });
      }
      return true;
    },
  })
  .test({
    name: "check-sellingPrice",
    test: (value, context) => {
      if (value.base_mrp < value.base_price) {
        return context.createError({
          path: "base_price",
          message: "Selling price must be less than MRP.",
        });
      }
      return true;
    },
  });
