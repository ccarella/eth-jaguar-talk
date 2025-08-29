# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15+ web3 application using OnchainKit for blockchain interactions, built with TypeScript and the App Router architecture. The project connects to the Base network and provides web3 functionality through wagmi and viem.

## Common Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type checking (use TypeScript compiler directly)
npx tsc --noEmit
```

## Architecture & Structure

### Technology Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript with strict mode enabled
- **Blockchain**: OnchainKit, wagmi v2, viem v2 for Base network integration
- **Styling**: TailwindCSS with dark mode by default
- **Package Manager**: npm or yarn (with .yarnrc.yml configuration)

### Directory Structure
- `/app` - Next.js App Router pages and components
  - `layout.tsx` - Root layout with metadata and providers
  - `page.tsx` - Home page component
  - `providers.tsx` - OnchainKit provider setup for Base network
  - `/svg` - Reusable SVG components
- Configuration files at root level (tsconfig.json, tailwind.config.ts, postcss.config.mjs, next.config.mjs)

### Key Configuration
- **TypeScript**: Strict mode enabled, ES2017 target, path alias `@/*` configured
- **Next.js**: Webpack externals configured for WalletConnect compatibility
- **Environment Variables**: 
  - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Required for OnchainKit
  - `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` - Used in page metadata

## Development Guidelines

### Component Development
- Default to server components; use `"use client"` directive only when hooks or browser APIs are needed
- Keep components small and composable, colocated by feature within `/app`
- Place route-specific components next to their routes
- Share reusable SVG components in `/app/svg`

### TypeScript Conventions
- Use explicit types for all function signatures and public exports
- Avoid `any` type; model unknowns precisely with discriminated unions
- Use descriptive variable names (avoid 1-2 character identifiers)
- Handle errors explicitly; no empty catch blocks
- Keep functions small with early returns to avoid deep nesting

### Code Style
- Match existing formatting and indentation
- Organize imports: framework/libs, then components, then utils, then styles
- Remove unused imports
- Keep JSX minimal and accessible with semantic HTML tags

### Web3 Integration
- OnchainKit provider wraps the application with Base network configuration
- Use wagmi hooks for wallet connections and blockchain interactions
- Reference OnchainKit documentation: https://onchainkit.xyz/getting-started
- Base documentation: https://docs.base.org/onchainkit/getting-started

### Testing & Verification
- Run `npm run lint` before committing
- Type check with `npx tsc --noEmit`
- Test in development with `npm run dev`
- Verify builds with `npm run build`