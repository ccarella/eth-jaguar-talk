## ETH Jaguar Talk — Product Brief

### 1) Project Overview / Description
ETH Jaguar Talk is a simple, Base-native cryptocurrency app that lets users create or connect a Base wallet to log in, then navigate three core tabs:
- Dashboard: View wallet identity, total portfolio value, and token holdings on Base.
- Swap: Swap tokens directly on Base.
- Earn: Deposit USDC into a Morpho vault on Base to earn yield.

The app is built around OnchainKit components for wallet/identity, swaps, and earning to deliver a cohesive, secure, and familiar UX on Base.

### 2) Target Audience
- Base ecosystem users who want a clean, minimal interface.
- Newcomers seeking an easy onramp to swapping and earning on Base.
- Power users who value fast, non-custodial interactions and clear portfolio views.

### 3) Primary Benefits / Features
- Wallet: Create or connect a Base wallet using OnchainKit Wallet; seamless login.
- Identity: Display ENS/Farcaster and identity context via OnchainKit Identity.
- Dashboard: Portfolio overview (total value, token list, basic positions) on Base.
- Swap: Base-native token swaps via OnchainKit Swap.
- Earn: Deposit/withdraw USDC into a Morpho vault to earn interest, with status and APY context via OnchainKit Earn.
- UX: Minimal, fast, and consistent design with clear transaction states.

### 4) High-Level Tech / Architecture
- Frontend: Next.js (App Router) + React + Tailwind CSS.
- Onchain: Base network (testnet for dev, mainnet for prod).
- OnchainKit: Identity, Wallet, Swap, Earn components and hooks.
  - Identity: https://docs.base.org/onchainkit/identity/identity
  - Wallet: https://docs.base.org/onchainkit/wallet/wallet
  - Swap: https://docs.base.org/onchainkit/swap/swap
  - Earn: https://docs.base.org/onchainkit/earn/earn
- Yield: Morpho USDC vault on Base for deposit/withdraw flows.
- Hosting: Vercel (builds, previews, and production deployment).
- Env/Infra: Base RPC, token lists, and minimal server usage (client-first where possible). 

This brief is intentionally concise to give shared context across teams building ETH Jaguar Talk.


