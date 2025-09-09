import z from "zod";

export const registerValidation = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.email(),
    password: z.string().min(8, "Minimum of 8 characters required"),
  }),
});

export const authValidation = {
  registerValidation,
};
