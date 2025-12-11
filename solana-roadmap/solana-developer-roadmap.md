# Learning Solana Development: A Structured Path

A comprehensive learning plan that takes you from zero to building production-ready applications on Solana.

---

## Phase 1: Foundations

### 1.1 Prerequisites
- **Rust basics** — Solana programs are written in Rust. Learn:
  - Ownership, borrowing, lifetimes
  - Structs, enums, pattern matching
  - Error handling with `Result` and `Option`
  - Resources: [The Rust Book](https://doc.rust-lang.org/book/), Rustlings exercises

- **Command line comfort** — You'll use CLI tools constantly

- **Basic blockchain concepts** — Understand accounts, transactions, consensus (proof of stake)

### 1.2 Solana Fundamentals
- **Account model** — Solana's core paradigm (different from Ethereum's contract model)
  - Programs are stateless, data lives in accounts
  - Accounts have owners, lamports (SOL), and data
  - Program Derived Addresses (PDAs)

- **Transactions** — Instructions bundled together, atomic execution

- **Rent** — Accounts must maintain minimum balance or be purged

---

## Phase 2: Development Environment

### 2.1 Tool Setup
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"

# Install Anchor (the dominant framework)
cargo install --git https://github.com/coral-xyz/anchor anchor-cli
```

### 2.2 Local Development
- Run `solana-test-validator` for local testing
- Use `solana config set --url localhost` to point to local
- Learn to airdrop SOL: `solana airdrop 5`

---

## Phase 3: First Programs

### 3.1 Hello World with Anchor
Build a simple program that stores and retrieves a message:
- Initialize an account
- Write data to it
- Read data back

### 3.2 Counter Program
Classic first project:
- Create a counter account
- Increment/decrement functions
- Access control (only owner can modify)

### 3.3 Key Concepts to Master
- `#[account]` macro and account validation
- `Context<T>` and account constraints
- `init`, `mut`, `has_one`, `seeds` constraints
- Error handling with custom errors

---

## Phase 4: Intermediate Projects

### 4.1 Token Basics
- Understand SPL Token program
- Create a fungible token
- Mint, transfer, burn operations
- Associated Token Accounts (ATAs)

### 4.2 Simple Escrow
Build a two-party escrow:
- Party A deposits token X
- Party B deposits token Y
- Atomic swap on completion
- Cancellation logic

### 4.3 Voting System
- Create proposals
- Token-weighted voting
- Time-locked execution
- Quorum requirements

---

## Phase 5: Advanced Concepts

### 5.1 Cross-Program Invocation (CPI)
- Call other programs from yours
- Integrate with SPL Token
- Composability patterns

### 5.2 PDAs Deep Dive
- Deterministic address generation
- Seeds and bumps
- Authority patterns
- Signing with PDAs

### 5.3 Security
- Common vulnerabilities:
  - Missing signer checks
  - Account confusion attacks
  - Integer overflow
  - Reinitialization attacks
- Use `anchor-lang` constraints properly
- Audit checklist mentality

---

## Phase 6: Frontend Integration

### 6.1 Web3.js / Solana SDK
```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@coral-xyz/anchor';
```

### 6.2 Wallet Integration
- Phantom, Solflare adapters
- `@solana/wallet-adapter-react`
- Transaction signing UX

### 6.3 Building a Complete dApp
- React/Next.js frontend
- IDL type generation
- Transaction builders
- Error handling and confirmations

---

## Phase 7: Production Project Ideas

### Beginner-Friendly (with real utility)
1. **Tip Jar** — Accept SOL tips with optional messages
2. **Proof of Attendance** — NFT minting for event attendees
3. **Simple Lottery** — Verifiable randomness, fair distribution

### Intermediate
4. **Subscription Service** — Recurring payments via token streams
5. **DAO Treasury** — Multi-sig with proposal system
6. **NFT Staking** — Lock NFTs, earn rewards

### Advanced (user-attracting potential)
7. **Prediction Market** — Binary outcome betting with AMM
8. **Lending Protocol** — Collateralized loans, liquidations
9. **DEX Aggregator** — Route finding across Jupiter, Raydium
10. **On-chain Game** — Turn-based with NFT characters

---

## Recommended Learning Resources

| Resource | Type | Best For |
|----------|------|----------|
| [Solana Cookbook](https://solanacookbook.com) | Docs | Quick recipes |
| [Anchor Book](https://book.anchor-lang.com) | Docs | Framework mastery |
| [Solana Bytes](https://www.youtube.com/c/SolanaFndn) | Video | Visual learners |
| [Buildspace](https://buildspace.so) | Course | Project-based |
| [Rareskills Solana](https://rareskills.io) | Course | Deep understanding |

---

## Suggested Timeline

| Phase | Focus |
|-------|-------|
| 1 | Rust fundamentals + Solana concepts |
| 2 | Environment setup, run examples |
| 3 | Build counter, understand accounts |
| 4 | Escrow, tokens, voting |
| 5 | Security, CPIs, optimization |
| 6 | Full-stack integration |
| 7 | Ship something real |

---

## Where to Start Right Now

1. If you don't know Rust → Start with [Rustlings](https://github.com/rust-lang/rustlings)
2. If you know Rust → Install tools, run `anchor init my_first_project`
3. Read the first 3 chapters of the Anchor Book
4. Build the counter program
5. Break it, debug it, understand every line
