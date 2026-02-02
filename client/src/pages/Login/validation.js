import * as yup from "yup";
const LoginSchema = yup.object({
  login: yup.string(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
// const LoginSchema = yup
//   .object({
//     email: yup.string().email().required(),
//     phoneNumber: yup.string().matches(/^[6-9]\d{9}$/, "Invalid phone number"),
//     UUID: yup.string().matches(/^\d{15,}$/, "Invalid UUID"),
//     password: yup
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   })
//   .test(
//     "atleast-one-login-key",
//     "Provide either email, phone number, or uuid.",
//     function (value) {
//       if (!value) return false;
//       const { email, phoneNumber, UUID } = value || {};
//       const count = [email, phoneNumber, UUID].filter(Boolean).length;
//       if (count === 0) {
//         return this.createError({
//           message: "Email, phone number, or uuid is required",
//         });
//       }
//       if (count.length > 1) {
//         return this.createError({
//           message: "Only one login identifier is allowed.",
//         });
//       }
//       return true;
//     },
//   );
export default LoginSchema;
