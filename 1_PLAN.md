### Feature: Homepage tabs (Dashboard, Swap, Earn) — implement Dashboard only

Brief
- Add a 3-tab navigation on the homepage: Dashboard (active), Swap, Earn. Only implement Dashboard now; Swap and Earn are non-functional placeholders.
- Dashboard shows: connected wallet address, any identity info (if exists), and a list of tokens and amounts held by the wallet.

Scope of Changes
- Update `app/page.tsx` to render a tabbed UI with three tabs at the top of the main content.
- Implement the Dashboard tab content; stub the other two tabs with disabled state.
- Reuse existing OnchainKit components for wallet connect and identity (already present in `app/page.tsx`).
- Add a token balances section using `wagmi` + `viem` to fetch ERC-20 balances for a curated token list on Base.
- No routing changes; tabs are client-side state in the same page for now.

Files to Edit/Create
- `app/page.tsx`: Replace current landing content with tab container and Dashboard section.
- `app/globals.css`: Ensure any minimal styles (if needed) for tabs are present (prefer Tailwind classes; avoid custom CSS unless necessary).
- `app/providers.tsx`: No change expected; continue providing `OnchainKitProvider` with `base`.

Key UI Details
- Tabs row: three buttons — Dashboard (selected), Swap (disabled), Earn (disabled). Keep Dieter Rams-inspired minimal style; Tailwind styling only.
- Header wallet: keep existing `Wallet` + `ConnectWallet` + `WalletDropdown`.
- Dashboard content:
  - Show `Identity` block (Avatar, Name, Address, EthBalance) if connected; otherwise show Connect CTA already provided by header.
  - Token list: fetch balances for a small, hardcoded set of Base tokens (e.g., ETH via native balance, and 2–4 common ERC-20s). Display symbol and human-readable balance. Hide tokens with zero balance.

Data/Algorithms
- Wallet/Identity: Use existing `@coinbase/onchainkit/identity` components (`Avatar`, `Name`, `Address`, `EthBalance`).
- Balances:
  1) Get connected address from `wagmi`.
  2) Get native ETH balance via `wagmi` `useBalance`.
  3) For ERC-20s, define a curated token array of `{ address, symbol, decimals }` on Base.
  4) Use `viem` public client (configured by `wagmi`) or `wagmi` `useReadContracts` to call `balanceOf(address)` for each token.
  5) Format using `viem` `formatUnits`. Filter zero balances. Sort by token symbol.

Phasing
- Phase 1 (now): Tabs UI and Dashboard implementation with balance fetching for a small token list; Swap/Earn disabled.
- Future: Implement Swap and Earn in separate features/routes. Consider moving tabs to a shared layout if multiple pages are introduced.

Notes
- Keep code simple and local to `app/page.tsx` for now.
- Prefer Vercel defaults; no server components required for this phase.
- Review onchainkit docs as needed when implementing Swap/Earn later.

