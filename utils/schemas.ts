import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "first name must be 2 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "last name must be 2 characters long." }),
  userName: z
    .string()
    .min(2, { message: "user name must be 2 characters long." }),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFilesTypes = ["image/"];
  return (
    z
      .any()
      // .refine((file) => {
      //   if (!file) return true;

      //   return file.size <= maxUploadSize;
      // }, "file must be less that 1 mb.")
      .refine((file) => {
        return (
          !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
        );
      }, "file must be in the type of image.")
  );
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    console.log(errors);
    throw new Error(errors.join(","));
  }
  return result.data;
}
