import type { SiteData } from "@/types/builder.schema";

const GOOGLE_FONT_LINKS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Comic+Relief:wght@400;700&family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  `;

export function buildHtml(rawHtml: string, site: SiteData): string {
    let html = rawHtml;

    html = /<title>.*?<\/title>/.test(html)
        ? html.replace(/<title>.*?<\/title>/, `<title>${site.category || "Portfolio"}</title>`)
        : html.replace("</head>", `  <title>${site.category || "Portfolio"}</title>\n  </head>`);

    if (site.logo) {
        html = /<link rel="icon"[^>]*>/.test(html)
            ? html.replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${site.logo}" />`)
            : html.replace("</head>", `  <link rel="icon" href="${site.logo}" />\n  </head>`);
    }

    if (!html.includes("fonts.googleapis.com")) {
        html = html.replace("</head>", `${GOOGLE_FONT_LINKS}</head>`);
    }

    const themeBg = site.theme?.bg || "#0b0f19";
    const themeInk = site.theme?.ink || "#ffffff";
    const themeAccent = site.theme?.accent || "#3b82f6";
    const themeSurface = site.theme?.surface || site.theme?.bg || "#111827";

    const tailwindThemeScript = `  <script>
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            ink: 'var(--ink)',
            'ink-soft': 'var(--ink-soft)',
            surface: 'var(--surface)',
            'surface-elevated': 'var(--surface-elevated)',
            accent: 'var(--accent)',
            border: 'var(--border)',
            card: 'var(--card)',
          },
          fontFamily: {
            sans: ['Poppins', 'Inter', 'sans-serif'],
            display: ['Poppins', 'Inter', 'sans-serif'],
            serif: ['Instrument Serif', 'serif'],
          },
          spacing: {
            '68': '17rem',
            '76': '19rem',
            '84': '21rem',
          },
          zIndex: {
            '25': '25',
          },
        },
      },
    };
  </script>
  <style>
    :root {
      --background: ${themeBg};
      --foreground: ${themeInk};
      --ink: ${themeInk};
      --ink-soft: color-mix(in srgb, ${themeInk} 70%, transparent);
      --surface: ${themeSurface};
      --surface-elevated: #1f2937;
      --accent: ${themeAccent};
      --border: color-mix(in srgb, ${themeInk} 15%, transparent);
      --card: ${themeSurface};
    }
  </style>
`;

    if (!html.includes("window.tailwind.config")) {
        html = html.replace("</head>", `${tailwindThemeScript}</head>`);
    }

    return html;
}