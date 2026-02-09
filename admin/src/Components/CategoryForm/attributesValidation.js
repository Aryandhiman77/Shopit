import * as yup from "yup";

const attributesSchema = yup.object({
  name: yup.string().required(),
  inputType: yup.string().required(),
  options: yup.array(yup.string()).optional(),
  required: yup.boolean().optional(),
});

export default attributesSchema;
