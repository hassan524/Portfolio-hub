import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import {
  FaYoutube,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa6";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title = "Portfolio",
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`Check out my portfolio: ${title || "Portfolio"}`);

  const handlePlatformShare = async (platform: string, href?: string) => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(`Link copied! Opening ${platform}...`);
    } catch {
      // Fallback
    }

    if (platform === "Instagram") {
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
    } else if (platform === "YouTube") {
      window.open("https://www.youtube.com", "_blank", "noopener,noreferrer");
    } else if (platform === "TikTok") {
      window.open("https://www.tiktok.com/upload", "_blank", "noopener,noreferrer");
    }
  };

  const platforms = [
    {
      name: "X",
      icon: <FaXTwitter className="size-[19px] text-white" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="size-[19px] text-[#25D366]" />,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="size-[19px] text-[#1877F2]" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="size-[19px] text-[#0A66C2]" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="size-[19px] text-[#26A5E4]" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Reddit",
      icon: <FaReddit className="size-[19px] text-[#FF4500]" />,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="size-[19px] text-[#E4405F]" />,
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="size-[19px] text-[#FF0000]" />,
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="size-[19px] text-white" />,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[85vw] max-w-sm rounded-lg border border-neutral-800 bg-[#0d0d0e] p-6 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <DialogTitle className="text-sm font-medium text-white">
              Share portfolio
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-500 mt-0.5">
              Anyone with the link can view this.
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 p-0.5 text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* URL row */}
        <div className="mt-4 flex items-center gap-2 border-t border-neutral-800 pt-3.5">
          <span className="min-w-0 flex-1 truncate text-xs font-mono text-neutral-400">
            {url}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Platform icons */}
        <div className="mt-3.5 grid grid-cols-5 gap-1 border-t border-neutral-800 pt-3.5">
          {platforms.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => handlePlatformShare(p.name, p.href)}
              title={p.name}
              aria-label={p.name}
              className="flex items-center justify-center rounded-md py-2.5 transition-colors hover:bg-white/[0.06] active:scale-95 cursor-pointer"
            >
              {p.icon}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}