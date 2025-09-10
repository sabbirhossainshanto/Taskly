import z from "zod";

const createWorkspacesSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Required"),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
  }),
});
const updateWorkspacesSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
  }),
});

export const workspaceValidation = {
  createWorkspacesSchema,
  updateWorkspacesSchema,
};
