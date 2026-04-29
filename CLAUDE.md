# Nexus Core

Cryptographic coordination infrastructure for hierarchically governed communities. The civilian sister project to `nexus-military`; both share the same primitives (identity, hierarchy, actions, credentials) but target different governance and threat models.

## Current Phase

**Phase 1 — Crypto** (Steps 13-21 in progress, currently 13-15 complete).

## Tech Stack

- **Build**: Vite 6 (React 19, TypeScript 5)
- **Styling**: Tailwind CSS v4 (CSS-first config — `@import "tailwindcss"` in `src/index.css`, no `tailwind.config.js`)
- **Routing**: react-router-dom v6
- **Backend client**: `@supabase/supabase-js` (uses publishable key, not legacy anon)
- **Testing**: Vitest + React Testing Library + jest-dom + jsdom
- **Lint**: ESLint 9 flat config (`eslint.config.js`) + typescript-eslint
- **Format**: Prettier 3
- **Crypto**: `libsodium-wrappers` (WASM crypto primitives)

## Directory Structure

```
src/
  packages/                  domain packages, each independently buildable
    crypto/                  primitives (libsodium-based; no other deps)
    identity/                depends on crypto
    hierarchy/               depends on crypto, identity
    actions/                 depends on crypto, identity, hierarchy
    credential/              depends on crypto, identity
    ui-primitives/           framework-agnostic UI building blocks
  lib/
    supabase.ts              shared Supabase client (project-only, not used in packages)
  app/
    App.tsx                  app shell + routes
    routes/                  route modules
    components/              app-level components
  main.tsx
  index.css
tests/setup.ts
docs/
examples/basic-config/
```

## Conventions

- **File naming**: `kebab-case` for plain `.ts` files; `PascalCase` for `.tsx` React components.
- **Path alias**: `@/*` resolves to `src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).
- **Exports**: named exports only inside `src/packages/**`. Default exports are reserved for React components in `src/app/**` and route modules. Enforced by `import/no-default-export` ESLint rule scoped to `src/packages/**/*`.
- **TypeScript**: strict mode plus `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`.
- **Supabase key format**: `VITE_SUPABASE_PUBLISHABLE_KEY` must start with `sb_publishable_`. The legacy anon-key format is not supported.
- **Env**: never commit `.env`. `.env.example` ships placeholders only.

## Package Dependency Rules

The `src/packages/*` packages form a layered graph. Lower layers must not import from higher layers.

- `crypto` — depends on `libsodium` only. No other internal package, no Supabase, no DOM, no React.
- `identity` — depends on `crypto`.
- `hierarchy` — depends on `crypto`, `identity`.
- `credential` — depends on `crypto`, `identity`.
- `actions` — depends on `crypto`, `identity`, `hierarchy`.
- `ui-primitives` — framework-agnostic; may depend on lower packages but not on `app/` or Supabase.

**No package under `src/packages/**` may import from `@supabase/supabase-js` or `src/lib/supabase.ts`.** Supabase access is an application-level concern owned by `src/app/**` and `src/lib/**`.

## Relationship to `nexus-military`

`nexus-core` and `nexus-military` are siblings, not parent/child. The `packages/` here are the civilian/community variants; `nexus-military` ships its own equivalents tuned for stricter operational requirements (compartmentalisation, audit, signing chains). Where possible, primitives are kept compatible at the wire-format level so credentials and signatures issued by one ecosystem can be verified by the other when policy permits.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build
- `npm run preview` — serve the production build
- `npm test` / `npm run test:watch` / `npm run test:ui` — Vitest
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
- `npm run typecheck` — `tsc -b --noEmit`
