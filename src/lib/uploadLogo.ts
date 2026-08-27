import { supabase } from "@/lib/supabase";

const LOGO_BUCKET = "site-assets";
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/svg+xml", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadSiteLogo(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Logo must be a PNG, JPG, SVG, or WebP image.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Logo must be smaller than 5 MB.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "img";
  const path = `logos/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(LOGO_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
      cacheControl: "3600",
    });

  if (error) {
    throw new Error(`Logo upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}