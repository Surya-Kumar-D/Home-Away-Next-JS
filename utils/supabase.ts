import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export const uploadImage = async (image: File) => {
  const buffer = Buffer.from(await image.arrayBuffer());

  const optimizedImage = await sharp(buffer)
    .resize(1200, 1200, { fit: "cover" })
    .toFormat("jpeg", { quality: 100 })
    .jpeg({ mozjpeg: true })
    .toBuffer();

  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;
  const { data } = await supabase.storage
    .from("Home-Away-Nest-JS")
    .upload(newName, optimizedImage, { cacheControl: "3600" });

  if (!data) throw new Error("There was an error while uploading the image.");

  return await supabase.storage.from("Home-Away-Nest-JS").getPublicUrl(newName)
    .data.publicUrl;
};
