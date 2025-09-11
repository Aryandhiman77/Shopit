import Joi from "joi";

// export const customerLoginSchema = Joi.object({
//   email: Joi.string().email().lowercase(),
//   phoneNumber: Joi.string().pattern(/^[0-9]{10}$/),
//   UUID: Joi.string().length(12),
//   password: Joi.string().min(6).max(20).required(),
//   role: Joi.string().valid("customer").required(),
// }).or("email", "phoneNumber", "UUID");

// export const RegistrationSchema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).lowercase().required().messages({
//     "string.name": "",
//   }),
//   email: Joi.string().email().lowercase(),
//   phoneNumber: Joi.string().pattern(/^[0-9]{10}$/),
//   UUID: Joi.string().length(12),
//   password: Joi.string().min(6).max(20).required(),
//   role: Joi.string().valid("customer", "seller").required(),
// }).or("email", "phoneNumber", "UUID");
export const LoginSchema = Joi.object({
  email: Joi.string().email().lowercase().messages({
    "string.email": "Please enter a valid email address.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Please enter a valid 10-digit phone number.",
    }),
  UUID: Joi.string().length(20).messages({
    "string.length": "Please enter a valid 20-digit user ID.",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must be less than 20 characters.",
    "any.required": "Password is required.",
  }),
  role: Joi.string().valid("admin", "seller", "customer").required().messages({
    "any.only": "Role must be either Admin, Seller or Customer.",
    "any.required": "Role is required.",
  }),
})
  .or("email", "phoneNumber", "UUID")
  .messages({
    "object.missing": "Please provide either Email, Phone Number, or UUID.",
  });

// /^[0-9]{10}$/ --> digits starting from 0 to 9 and must be of length 10
