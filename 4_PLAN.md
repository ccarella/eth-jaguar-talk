Earn Tab – Technical Plan

Context
- Add an "Earn" tab that uses OnchainKit Earn components to allow the user to deposit USDC into a Morpho vault to earn. (Verbatim: "use onchainkit earn components to allow the user to deposit usdc into a morpho vault to earn")
- Chain: Base mainnet (chainId 8453), consistent with existing app setup and USDC usage.

Scope of This Plan
- Implement deposit flow only (approve + deposit) into a Morpho ERC-4626 USDC vault on Base via OnchainKit Earn components. Withdraw/redemption is out-of-scope for this iteration.

Files to Add / Edit
1) app/components/EarnPanel.tsx [ADD]
   - Purpose: Encapsulate the Earn experience using OnchainKit Earn components.
   - Responsibilities:
     - Render Earn UI for a specific Morpho USDC vault (address via env var).
     - Provide a minimal, focused layout aligned with existing styling (Tailwind) and Dieter Rams-inspired simplicity.
     - Use OnchainKit Earn primitives for deposit flow (approve + deposit), vault metadata display (APY/TVL where provided by the kit), and transaction UX.
   - Configuration inputs:
     - NEXT_PUBLIC_MORPHO_USDC_VAULT_ADDRESS (Base vault address; see Environments section).
     - Optional: isSponsored flag controlled via NEXT_PUBLIC_EARN_SPONSORED ("true"/"false").

2) app/page.tsx [EDIT]
   - Enable the "Earn" tab button (remove disabled) and set it to render <EarnPanel /> when activeTab === 'earn'.
   - Keep the tabbed single-page UX consistent with current Dashboard and Swap sections.

3) app/providers.tsx [EDIT, optional]
   - If gas sponsorship is desired, add/paymaster configuration to OnchainKitProvider using NEXT_PUBLIC_PAYMASTER_URL.
   - No change required if not sponsoring transactions.

4) .env.local (and Vercel project env) [ADD VARS]
   - NEXT_PUBLIC_MORPHO_USDC_VAULT_ADDRESS: Morpho USDC vault address on Base (ERC-4626). Example placeholder until confirmed.
   - NEXT_PUBLIC_EARN_SPONSORED: "true" to enable sponsored mode for Earn, otherwise unset/"false".
   - NEXT_PUBLIC_PAYMASTER_URL: Required only if sponsorship is enabled; points to a valid paymaster endpoint.

Integration Details (OnchainKit Earn + Morpho Vault)
- OnchainKit Earn provides a composable UI and transaction flow for ERC-4626 vaults.
- Morpho Vaults implement ERC-4626 (deposit/mint, redeem/withdraw). The deposit path requires ERC-20 USDC approval followed by a vault deposit call.
- USDC on Base is already referenced in this codebase; vault must accept USDC as the asset token.

Deposit Flow Algorithm (Approve + Deposit)
1) Preconditions
   - Wallet connected and on Base (8453). If not, prompt the user to switch.
   - NEXT_PUBLIC_MORPHO_USDC_VAULT_ADDRESS is defined and checksummed.

2) Input & Validation
   - User enters USDC amount (6 decimals). Validate non-empty, > 0, <= wallet USDC balance.
   - Convert human-readable amount to smallest units for contract interaction.

3) Allowance Check & Approve (if needed)
   - Query current USDC allowance for the vault address.
   - If allowance < desired deposit amount, submit ERC-20 approve for at least the deposit amount.
   - Wait for confirmation; surface transaction state via OnchainKit Earn components.

4) Deposit
   - Call vault.deposit(amount, receiver = userAddress) on the ERC-4626 Morpho vault.
   - Wait for confirmation; display success state and updated position metrics.

5) Post-Transaction Updates
   - Refresh balances: USDC wallet balance and vault share balance (if displayed by the component set).
   - Show a lightweight receipt/state summary.

UI/UX Notes
- Minimalist card within the existing container widths (max-w-xl to max-w-4xl), matching typography and spacing used in Dashboard/Swap.
- Clear primary action hierarchy: input → approve (if required) → deposit.
- Display key vault metadata if available via the Earn components (e.g., APY, TVL, asset, share token symbol) to help users understand what they are depositing into.

Environments & Configuration
- Provide the vault address via NEXT_PUBLIC_MORPHO_USDC_VAULT_ADDRESS.
- If enabling gas sponsorship:
  - Set NEXT_PUBLIC_EARN_SPONSORED=true, provide NEXT_PUBLIC_PAYMASTER_URL.
  - Ensure the paymaster allowlist includes: USDC approve(), Vault deposit().

Safety & Edge Cases
- Handle insufficient USDC balance and insufficient allowance gracefully.
- Prevent zero/NaN deposit amounts.
- Block actions when wallet is disconnected or on wrong chain; provide switch CTA.
- Degrade gracefully if vault metadata endpoints are unavailable; core deposit flow should remain functional.

Out of Scope (for this iteration)
- Withdraw/redeem flow.
- Multi-vault selector; we target a single Morpho USDC vault address.
- Historical yield charts/analytics.


