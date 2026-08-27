# PortfolioHub

PortfolioHub is a React and Vite portfolio-builder application. Users choose a
template, edit it in the live editor, save a draft, or deploy a read-only React
portfolio to Vercel or Netlify.

## Requirements

- Node.js 20 or newer
- An API backend compatible with the endpoints in `src/api`
- Supabase project credentials for authentication

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide the required values.
3. Start the app with `npm run dev`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format source files with Prettier. |

## Project layout

```text
src/
  api/           API clients
  assets/        Static template artwork
  components/
    blocks/      Portfolio sections and variants
    common/      Shared application components
    editor/      Live template editor
    individual/  Route-level pages and page sections
    ui/          Reusable UI primitives
  context/       Authentication and application state
  data/          Portfolio template JSON files
  lib/           Registries, builders, and editor helpers
  schemas/       Form validation schemas
  types/         Shared TypeScript types
viewer-app/      Base files for the React app generated on deployment
```

## Deployment flow

`TemplatePreviewDialog` saves the edited site data, then
`buildViewerAppFiles` creates a self-contained React viewer project. The
generated project uses the same block components as the editor, keeps client
interactions and animations, and replaces editable text controls with a
read-only implementation before the deploy request is sent.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Production API base URL. |
| `VITE_SUPABASE_URL` | Supabase project URL. |
| `VITE_SUPABASE_ANON_KEY` | Supabase browser anonymous key. |
| `VITE_PADDLE_CLIENT_TOKEN` | Paddle browser client token. |

Never commit `.env` files or provider keys.
