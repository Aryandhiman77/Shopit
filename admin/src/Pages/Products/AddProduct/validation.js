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

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const validFileExtensions = ["jpg", "png", "jpeg"];

function isValidFileType(fileName, fileTypes) {
  return fileName && fileTypes.indexOf(fileName.split(".").pop()) > -1;
}
export const imagesSchema = yup.object({
  thumbnail: yup
    .mixed()
    .test("required", "You need to provide an image", (value) => {
      // Check if a file is present
      return value && value.length > 0;
    })
    .test("fileSize", "File must be less than 2 MB size.", (value) => {
      return value && value.length > 0 && value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      return (
        value &&
        value.length > 0 &&
        isValidFileType(value[0]?.name.toLowerCase(), validFileExtensions)
      );
    }),
  gallery: yup
    .mixed()
    .test("required", "Add atleast one image.", (value) => {
      return value && value.length > 0;
    })
    .test("fileSize", function (value) {
      if (!value || !value.length) return true;
      const file = Array.from(value).find((f) => f.size > MAX_FILE_SIZE);
      if (file) {
        return this.createError({
          message: `${file.name} must be less than 2MB.`,
        });
      }
      return true;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value || !value.length) return true;

      return Array.from(value).every((file) =>
        isValidFileType(file?.name.toLowerCase(), validFileExtensions),
      );
    }),
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
