import * as yup from "yup";
const categoryValidationSchema = yup.object({
  name: yup
    .string()
    .required("Category name is required.")
    .min(3, "Category name must contain atleast 3 characters.")
    .max(25, "Category name cannot be more than 25 characters."),
  parentCategory: yup.string().optional(),
  isActive: yup.boolean().required(),
  description: yup
    .string()
    .max(300, "Category description must be less than 300 characters."),
  attributes: yup.array(yup.object({})).optional(),
});
export default categoryValidationSchema;
