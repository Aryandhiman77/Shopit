import * as yup from "yup";

export const basicProductInfo = yup
  .object({
    title: yup.string().required("Product title is a required field."),
    brand: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .typeError("Brand is a required field.")
      .required("Brand is a required field."),
    categories: yup
      .array(
        yup
          .object({
            label: yup.string(),
            value: yup.string(),
          })
          .typeError("Categories must be an object."),
      )
      .min(1, "Select atleast one category"),
    shortDescription: yup
      .string()
      .min(20, "Breif description must contain atleast 20 characters")
      .required("Breif Description is required.")
      .max(200, "Brief Descriptions must be less than 200 characters."),
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

export const imagesSchema = yup.object({
  thumbnail: yup.string(),
  gallery: yup.array().of(yup.string()),
});
export const richDescriptionValidation = yup.object({
  description: yup.string().notRequired(),
});
export const inventory = yup.object({
  stock: yup.string().optional(),
});
export const tagsValidations = yup.object({
  tags: yup.array().of(yup.string()).optional().notRequired(),
});
