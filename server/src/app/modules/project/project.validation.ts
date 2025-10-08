import z from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Required"),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
    workspace: z.string(),
  }),
});
export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Minimum 1 character required").optional(),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
  }),
});

export const projectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
