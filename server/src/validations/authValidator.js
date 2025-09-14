import Joi from "joi";

const baseSchema = {
  email: Joi.string().email().lowercase().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Please enter a valid 10-digit phone number.",
      "string.empty": "Phone Number cannot be empty.",
    }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must be less than 20 characters.",
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  role: Joi.string().valid("admin", "seller", "customer").required().messages({
    "any.only": "Role must be either Admin, Seller or Customer.",
    "any.required": "Role is required.",
    "string.empty": "Role cannot be empty.",
  }),
};

export const LoginSchema = Joi.object({
  ...baseSchema,
  UUID: Joi.string().length(20).messages({
    "string.length": "Please enter a valid 20-digit admin ID.",
    "string.empty": "UUID cannot be empty.",
  }),
})
  .or("email", "phoneNumber", "UUID")
  .messages({
    "object.missing": "Please provide either Email, Phone Number, or User ID.",
  });

// /^[0-9]{10}$/ --> digits starting from 0 to 9 and must be of length 10

export const RegistrationSchema = Joi.object({
  ...baseSchema,
  name: Joi.string().lowercase().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must be less than 30 characters.",
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
  }),
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password.",
    "any.required": "Confirm Password is required.",
    "string.empty": "Confirm Password cannot be empty.",
  }),
  role: Joi.string().valid("seller", "customer").required().messages({
    "any.only": "Role must be either Seller or Customer.",
    "any.required": "Role is required.",
    "string.empty": "Role cannot be empty.",
  }),
});

export const otpVerificationSchema = Joi.object({
  otp: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "Otp must contain 6-digits.",
      "any.required": "Otp is required.",
      "string.empty": "OTP cannot be empty.",
    }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Please enter a valid 10-digit phone number.",
      "string.empty": "Phone Number cannot be empty.",
    }),
})
  .or("email", "phoneNumber")
  .messages({
    "object.missing": "Please provide either Email or Phone Number.",
  });

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(20).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must be less than 20 characters.",
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password.",
    "any.required": "Confirm Password is required.",
    "string.empty": "Confirm Password cannot be empty.",
  }),
});
