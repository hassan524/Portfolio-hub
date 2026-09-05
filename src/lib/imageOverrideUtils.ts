export type ImageOverrides = Record<string, string>;

export const IMAGE_OVERRIDES_PROP = "imageOverrides";

export function getImageOverrides(
  props: Record<string, unknown> | null | undefined,
): ImageOverrides {
  const value = props?.[IMAGE_OVERRIDES_PROP];
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(
      (entry): entry is [string, string] =>
        typeof entry[0] === "string" &&
        entry[0].length > 0 &&
        typeof entry[1] === "string" &&
        entry[1].length > 0,
    ),
  );
}

export function applyRenderedImageOverrides(root: ParentNode, overrides: ImageOverrides) {
  const imgs = Array.from(root.querySelectorAll("img"));

  imgs.forEach((img) => {
    const currentSrc = img.getAttribute("src") || "";
    const lastReplacement = img.dataset.appliedReplacement || "";
    const originalSrc =
      currentSrc && currentSrc !== lastReplacement
        ? currentSrc
        : img.dataset.originalSrc || currentSrc;

    if (!originalSrc) return;

    img.dataset.originalSrc = originalSrc;

    const replacement = overrides[originalSrc];
    if (replacement && img.getAttribute("src") !== replacement) {
      img.setAttribute("src", replacement);
      img.dataset.appliedReplacement = replacement;
    } else if (!replacement) {
      delete img.dataset.appliedReplacement;
    }
  });
}
