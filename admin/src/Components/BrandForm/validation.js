import * as yup from "yup";
const brandValidationSchema = yup.object({
  name: yup
    .string()
    .required("Brand name is required.")
    .min(3, "Brand name must contain atleast 3 characters.")
    .max(25, "Brand name cannot be more than 25 characters."),
  description: yup
    .string()
    .max(400, "Brand description must be less than 300 characters."),
  categories: yup
    .array(
      yup
        .object({
          label: yup.string(),
          value: yup.string(),
        })
        .typeError("Categories must be an object."),
    )
    .min(1, "Select atleast one category").required("Category is required."),
});

export default brandValidationSchema;
