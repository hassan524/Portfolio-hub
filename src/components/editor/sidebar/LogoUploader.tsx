import { useState } from "react";
import { ImageUp, Loader2, X } from "lucide-react";

import { uploadSiteLogo } from "@/lib/uploadLogo";

type LogoUploaderProps = {
  logo: string | null;
  onChange: (url: string | null) => void;
};

export function LogoUploader({ logo, onChange }: LogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFile(file: File) {
    setIsUploading(true);
    try {
      const url = await uploadSiteLogo(file);
      onChange(url);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Logo upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="group relative shrink-0">
      <label
        title="Upload Site Logo"
        className={`relative flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border transition-all ${
          logo
            ? "border-transparent bg-background shadow-sm"
            : "border-dashed border-border bg-secondary/30 hover:border-foreground/30 hover:bg-secondary/60"
        }`}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-soft" />
        ) : logo ? (
          <img src={logo} alt="Site logo" className="h-full w-full object-contain p-1" />
        ) : (
          <ImageUp className="h-4 w-4 text-ink-soft" />
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleFile(file);
            event.target.value = "";
          }}
        />
      </label>

      {logo && !isUploading && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-background border border-border shadow-sm group-hover:flex text-ink-soft hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors z-10"
          title="Remove logo"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
