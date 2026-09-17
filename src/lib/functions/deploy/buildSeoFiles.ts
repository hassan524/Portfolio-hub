export const SITE_URL_PLACEHOLDER = "__SITE_URL__";

export function buildSitemap(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL_PLACEHOLDER}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

export function buildRobotsTxt(): string {
    return `User-agent: *
Allow: /

Sitemap: ${SITE_URL_PLACEHOLDER}/sitemap.xml`;
}