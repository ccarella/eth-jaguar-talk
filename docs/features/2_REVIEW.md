## Feature Review — Swap Tab (ETH → USDC on Base)

### Scope Reviewed
- Plan: `2_PLAN.md`
- Implementation: `app/page.tsx`, `app/components/SwapPanel.tsx`, `app/providers.tsx`, `app/layout.tsx`

### Summary
The Swap tab has been implemented per plan using OnchainKit. The tab is enabled, the swap UI is gated behind wallet connection, and the swap widget is configured for ETH (native) → USDC on Base. Providers and styles are correctly wired.

### Plan Compliance
- Enable Swap tab and render swap UI behind connection: ✅ Implemented in `app/page.tsx`.
- Create dedicated `SwapPanel` with OnchainKit swap components: ✅ `app/components/SwapPanel.tsx`.
- Preselect from-token ETH (native) and to-token USDC on Base: ✅ Address `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` used.
- Keep providers/styles as-is: ✅ `app/providers.tsx` and `app/layout.tsx` match expectations.
- Optional callbacks/balance display: ➖ Not implemented (optional per plan).

### Code Notes
- `app/page.tsx`
  - Swap tab enabled; `activeTab === 'swap'` renders `<SwapPanel />`.
  - Wallet connection check (`useAccount().isConnected`) correctly gates the swap UI.
  - USDC balance reads use the correct Base USDC token address.
  - Minor: USDC address is duplicated here and inside `SwapPanel` → consider centralizing.

- `app/components/SwapPanel.tsx`
  - Uses `Swap` from `@coinbase/onchainkit/swap` with `from=[ETH_NATIVE]` and `to=[USDC_BASE]`.
  - Chain ID set to Base (8453). USDC Base address is correct.
  - Slippage configured to `1` and `experimental.useAggregator` enabled. Both are reasonable defaults.
  - Potential alignment check: Native ETH token is represented with `address: ''`. Confirm this matches OnchainKit’s expected representation for native tokens. If a dedicated native token constant or `isNative` flag exists in the SDK, prefer that for clarity.

- `app/providers.tsx` and `app/layout.tsx`
  - `OnchainKitProvider` initialized with `chain={base}` and `NEXT_PUBLIC_ONCHAINKIT_API_KEY` → as required.
  - Global OnchainKit styles imported in layout.

### Risks and Edge Cases
- Native token representation: If `address: ''` is not the canonical way to denote native ETH in the Swap component, quotes or execution could fail. Action: Verify against the latest OnchainKit docs and update to the recommended native token config if needed.
- Constant duplication: The USDC Base address appears in both `app/page.tsx` and `app/components/SwapPanel.tsx`. This increases drift risk.

### Suggestions (Low Effort)
- Centralize token constants (e.g., `app/constants/tokens.ts`) and import in both the page and the panel.
- Optionally surface success/error callbacks from `SwapPanel` to refresh balances in the page after a successful swap.
- Optionally show read-only balances above the widget on the Swap tab for context (plan marked this as optional).

### Manual Verification Steps
1) Ensure `NEXT_PUBLIC_ONCHAINKIT_API_KEY` is set in the environment.
2) Start the app: `npm run dev` and open `http://localhost:3000`.
3) Connect a wallet using the header connect button.
4) Switch to the Swap tab.
5) Enter an ETH amount and confirm that a USDC quote appears.
6) Proceed to confirm the swap; observe pending/success/error states.
7) After success, return to the Dashboard tab and confirm balances reflect the swap (you may need to refresh if callbacks aren’t wired).

### Verdict
Implementation aligns with the plan and is production-readable. Address the native token representation check and centralize token constants to reduce future maintenance risk.


