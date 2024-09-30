import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Minimum 3 Characters Needed" })
    .max(255, { message: "Max limit of 255 Characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Minimum 3 Characters Needed in email" })
    .max(255, { message: "Max limit of 255 Characters in email" }),

  phone: z
    .string({ required_error: "Phone Number is Required" })
    .trim()
    .min(10, { message: "Phone Number should be of 10 Digits only" })
    .max(10, { message: "Phone Number should be of 10 Digits only" }),

  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(6, { message: "Password should be more than 6 Characters" })
    .max(20, { message: "Password should be less than 20 Characters" }),

  industry: z
    .string({ required_error: "Industry is required" })
    .trim()
    .min(3, { message: "Minimum 3 characters required for industry" })
    .max(255, { message: "Max limit of 255 characters in industry" }),

  location: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(2, { message: "Minimum 2 characters required for location" })
    .max(255, { message: "Max limit of 255 characters in location" }),

  interests: z
    .string({ required_error: "Interests are required" })
    .trim()
    .min(3, { message: "Minimum 3 characters required for interests" })
    .max(555, { message: "Max limit of 555 characters in interests" }),

  userType: z
    .string({ required_error: "User Type is required" })
    .trim()
    .min(3, { message: "Minimum 3 characters required for user type" })
    .max(255, { message: "Max limit of 255 characters in user type" }),

  bio:z.string({required_error: "Currently Working/Studying information is Required"})
  .trim()
  .min(3, { message: "Minimum 2 characters required for Company/College" })
  .max(255, { message: "Max limit of 255 characters in Company/College" }),
});

export default signupSchema;
// import {z} from "zod";

// const signupSchema = z.object({
//     username: z.string({required_error: "Name is required"})
//     .trim()
//     .min(3, {message: "Minimum 3 Characters Needed"})
//     .max(255, {message: "Max limit of 255 Characters"}),

//     email: z.string({required_error: "Email is required"})
//     .trim()
//     .email({message: "Invalid email address"})
//     .min(3, {message: "Minimum 3 Characters Needed in email"})
//     .max(255, {message: "Max limit of 255 Characters in email"}),

//     phone: z.string({required_error: "Phone Number is Required"})
//     .trim()
//     .min(10, {message: "Phone Number should be of 10 Digits only" })
//     .max(10, {message: "Phone Number should be of 10 Digits only" }),

//     password: z.string({required_error: "Password is Required"})
//     .trim()
//     .min(6, {message: "Password should be more than 6 Characters" })
//     .max(20, {message: "Password should be less than 20 Characters" }),
// });

// export default signupSchema;