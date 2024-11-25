import { profileSchema } from "./schemas";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  "use server";
  const rawData = Object.fromEntries(formData);
  try {
    const validateFields = profileSchema.parse(rawData);
    console.log(validateFields);
  } catch (error) {
    return { message: "There was an error" };
  }
  return { message: "Successfully submitted" };
};
