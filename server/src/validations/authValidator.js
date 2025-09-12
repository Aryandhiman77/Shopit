import Joi from "joi";

const baseSchema = {
  email: Joi.string().email().lowercase().messages({
    "string.email": "Please enter a valid email address.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Please enter a valid 10-digit phone number.",
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
};

export const LoginSchema = Joi.object({
  ...baseSchema,
  UUID: Joi.string().length(20).messages({
    "string.length": "Please enter a valid 20-digit user ID.",
  }),
})
  .or("email", "phoneNumber", "UUID")
  .messages({
    "object.missing": "Please provide either Email, Phone Number, or User ID.",
  });

// /^[0-9]{10}$/ --> digits starting from 0 to 9 and must be of length 10

const RegistrationSchema = Joi.object({});
