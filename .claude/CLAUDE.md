# CLAUDE.md

## Всегда работай на русском!

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 3000
npm run build        # Type-check + Vite build (outputs to build/)
npm run lint         # ESLint with zero warnings tolerance
npm run lint:ci      # ESLint (allows warnings, used in CI)
npm run eslint:fix   # Auto-fix ESLint issues
npm run typescript:validate  # Type-check without emitting
```

No test framework is configured — there are no test files or test scripts.

## Environment Variables

Required in `.env`:
```
VITE_COIN_API_HOST=https://api.coingecko.com/api/v3/
VITE_CRYPTO_LIGHT_API_HOST=http://crypto-light.space
```

## Architecture: Feature-Sliced Design (FSD)

The project strictly follows [FSD](https://feature-sliced.design/). Layers (bottom to top — lower layers cannot import from higher):

```
shared → entities → features → widgets → pages → app
```

- **`shared/`** — API clients, config, reusable UI, utilities
- **`entities/`** — Business entities (`coin/`, `user/`) with model + ui + lib
- **`features/`** — User interactions (auth, registration, favoriteCoin, priceChart)
- **`widgets/`** — Composite UI combining entities + features
- **`pages/`** — Route-level components
- **`app/`** — Root component, providers, router

ESLint enforces import boundaries via `@feature-sliced/eslint-config` and `eslint-plugin-boundaries`. Violations will fail `npm run lint`.

## Path Aliases

`~/` resolves to `src/` in both TypeScript and Vite:
```ts
import { coingeckoApi } from '~/shared/api';
```

## State Management: Effector

All state lives in `model/` directories within each slice. Pattern:

```ts
// Effects (async)
export const fetchCoinFx = createEffect(async (id: string) => api.coins.getCoin(id));

// Store
export const $coin = createStore<CoinState>(initial)
  .on(fetchCoinFx.doneData, (_, { data }) => data);

// Derived stores
export const $coinIsLoading = fetchCoinFx.pending;

// React hooks (selectors)
export const useCoin = () => useStore($coin);

export const selectors = { useCoin };
```

- Use `immer`'s `produce` for complex state mutations
- Side effects (localStorage sync, logging) go in `.watch()` callbacks
- Page-level events (e.g., `pageMounted`) trigger effects via `.watch()`

## Provider Composition

Providers use `compose-function` in `app/providers/`:
```ts
export const withProviders = compose(withRouter, withUi, withAuth);
```

`withAuth` verifies the user token on startup and persists user to localStorage.

## API Layer

Two API clients in `shared/api/`:
- **`coingecko/`** — Public CoinGecko API (trending, coin detail, market chart)
- **`cryptoLight/`** — Custom backend (auth, user data, favorites)

Both use Axios with interceptors that convert snake_case responses to camelCase automatically.

## Routes

Defined as an enum in `shared/config/routes/routes.ts`:
```ts
export enum RouteName {
  TRENDING_COIN_PAGE = '/',
  COIN_PAGE = '/coin/:coinId',
  PROFILE_PAGE = '/profile'
}
```


