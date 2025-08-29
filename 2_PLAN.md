Swap Tab Plan — ETH → USDC using OnchainKit swap components

Context
- Implement a "Swap" tab that allows users to swap from ETH to USDC on Base.
- Must use onchainkit swap components.
- Current UI already has tabs in `app/page.tsx`, with "Swap" disabled. OnchainKit is initialized in `app/providers.tsx` and styles are loaded in `app/layout.tsx`.

Scope of Changes
1) Enable and implement the Swap tab in `app/page.tsx`.
   - Remove `disabled` on the Swap tab button, wire `activeTab === 'swap'` to render the swap UI.
   - Gate swap UI behind wallet connection (reuse `useAccount().isConnected`).

2) Create a dedicated swap UI component (no business logic in page): `app/components/SwapPanel.tsx`.
   - Render OnchainKit swap components to perform ETH → USDC.
   - Preselect from-token: native ETH on Base; to-token: USDC on Base at `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`.
   - Expose minimal props (optional): `defaultFromAmount`, and callbacks for success/failure.

3) Keep providers and styles as-is.
   - `app/providers.tsx` already wraps with `OnchainKitProvider` using `base` and `NEXT_PUBLIC_ONCHAINKIT_API_KEY`.
   - `app/layout.tsx` imports `@coinbase/onchainkit/styles.css`.

OnchainKit Integration Details
- Use OnchainKit swap components (from the swap module) to render a full swap widget.
- Required configuration:
  - Chain: Base (already provided via `OnchainKitProvider`).
  - Tokens: from (ETH/native), to (USDC at `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`).
  - Wallet connection: rely on existing `Wallet`/`ConnectWallet` in the header.
- Behavior:
  - When user inputs amount of ETH, widget fetches a quote for USDC.
  - If allowance/approval is needed (not expected for native ETH), surface via component UX.
  - On confirm, initiate swap transaction and surface pending/success/error states provided by the component.

Minimal UI/UX
- Match existing app design: keep a simple, clean panel within the tab content area in `app/page.tsx`.
- Show balances contextually (optional): read-only ETH/USDC balances (already fetched in page) can be shown above the widget.
- Errors and disabled states are delegated to OnchainKit components.

Files and Functions
- `app/page.tsx`
  - Update tab button: enable "Swap" (remove `disabled`).
  - Render `<SwapPanel />` when `activeTab === 'swap'`.
- `app/components/SwapPanel.tsx` (new)
  - Default export component rendering OnchainKit swap components.
  - Hardcode/centralize USDC Base address; accept optional props for overrides if needed.

Data/Constants
- USDC on Base: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`.
- Consider extracting token addresses to a simple constants module later if reused.

Operational Notes
- Env: ensure `NEXT_PUBLIC_ONCHAINKIT_API_KEY` is set (already used by provider).
- No backend changes required.
- No routing changes required (stays single-page tabbed UI).

User Flow (Algorithm)
1) User connects wallet using the header `ConnectWallet`.
2) User selects the "Swap" tab.
3) Swap UI loads with from-token = ETH (native), to-token = USDC (Base).
4) User inputs ETH amount; a quote is fetched and displayed.
5) User confirms; transaction is sent; UI shows pending then success/error.
6) On success, optionally refresh balances in page context.

Non-Goals / Out of Scope
- Cross-chain swaps; token lists beyond ETH→USDC.
- Advanced settings beyond default slippage/quote refresh provided by OnchainKit.

Validation Checklist
- Swap tab is clickable and renders the swap widget.
- With a connected wallet on Base, entering an ETH amount shows a USDC quote.
- Confirming performs a transaction and success/error states appear.
- Balances remain visible/consistent in the Dashboard tab.

