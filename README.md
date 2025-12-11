# Solana Development Learning Repository

A personal workspace for learning Solana blockchain development, from Rust fundamentals to building full-stack decentralized applications.

## What's Inside

### `/notepad-app`
A complete full-stack Solana dApp built with the Anchor framework. This notepad application demonstrates:
- **On-chain program** (Rust) - Create and update notes stored on the Solana blockchain
- **Program Derived Addresses (PDAs)** - Deterministic account addressing using seeds
- **Next.js frontend** - React-based UI with wallet integration (Phantom, Solflare)
- **Account validation** - Ownership checks ensuring only note authors can modify their notes

The smart contract allows users to:
- Create notes with unique IDs
- Update note content (with automatic account reallocation)
- Query notes filtered by author

### `/solana-roadmap`
Learning resources and study guides:
- **Developer roadmap** - Phased learning path from Rust basics to production dApps
- **Rust essentials** - Focused Rust crash course covering ownership, borrowing, structs, enums, and error handling
- **Solana fundamentals** - Core concepts including accounts, programs, and transactions

### `/rust-practice`
Rust code examples for practicing fundamental concepts like ownership and borrowing.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Smart Contracts | Rust + Anchor |
| Frontend | Next.js, React, TypeScript |
| Wallet Integration | `@solana/wallet-adapter-react` |
| Blockchain Interaction | `@solana/web3.js`, `@coral-xyz/anchor` |
| Local Development | `solana-test-validator` |

## Getting Started

### Prerequisites
- [Rust](https://rustup.rs/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://www.anchor-lang.com/docs/installation)
- Node.js & Yarn

### Running the Notepad App
```bash
cd notepad-app

# Build the Solana program
anchor build

# Start local validator
solana-test-validator

# Deploy to localnet
anchor deploy

# Start the frontend
cd app
yarn install
yarn dev
```

## Learning Path

1. Study Rust fundamentals (`/solana-roadmap/rust-essentials-for-solana.md`)
2. Understand Solana's account model (`/solana-roadmap/solana-dev.md`)
3. Follow the developer roadmap (`/solana-roadmap/solana-developer-roadmap.md`)
4. Explore the notepad app as a working example
