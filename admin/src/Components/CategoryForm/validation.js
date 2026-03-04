import * as yup from "yup";
const categoryValidationSchema = yup
  .object({
    name: yup
      .string()
      .required("Category name is required.")
      .min(3, "Category name must contain atleast 3 characters.")
      .max(25, "Category name cannot be more than 25 characters."),
    description: yup
      .string()
      .max(300, "Category description must be less than 300 characters."),
    attributes: yup.array(yup.object({})).optional(),
    level: yup.number().required("Level is required."),
    parent: yup
      .object({
        label: yup.string(),
        value: yup.string(),
      })
      .typeError("Categories must be an object.")
      .optional(),
  })
  .test({
    name: "parent-required",
    message: "Select Parent Category.",
    test: (value) => {
      const level = value.level;
      const parent = value.parent;
      if (level === 1) {
        return true;
      }
      if (level > 1 && parent !== "") {
        return true;
      }
      return false;
    },
  });
// .unknown(false, "Other Values not allowed.");
export default categoryValidationSchema;
