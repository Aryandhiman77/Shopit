import * as yup from "yup";
const categoryValidationSchema = yup.object({
  name: yup.string().required("Category name is required."),
  parentCategory: yup.string().optional(),
  isActive: yup.boolean().required(),
  description: yup
    .string()
    .max(300, "Category description must be less than 300 characters."),
});
export default categoryValidationSchema;
