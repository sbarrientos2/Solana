# Solana Development

Solana development involves building decentralized applications (dApps) and smart contracts (called "programs" in Solana) on the Solana blockchain.

## Core Concepts

### Programs (Smart Contracts)
- Written primarily in **Rust** (most common) or **C/C++**
- Compiled to BPF (Berkeley Packet Filter) bytecode
- Stateless - they read/write to separate account data structures

### Accounts
- Store all state on Solana (data, tokens, program code)
- Programs don't store state internally; they modify account data
- Must pay "rent" (or be rent-exempt with minimum balance)

### Transactions
- Contain one or more instructions
- Instructions specify which program to call and which accounts to use
- All accounts accessed must be declared upfront (enables parallel processing)

## Development Stack

| Layer | Tools |
|-------|-------|
| On-chain programs | Rust + Anchor framework |
| Client/Frontend | JavaScript/TypeScript with `@solana/web3.js` or `@solana/kit` |
| Local testing | `solana-test-validator` |
| Deployment | Solana CLI |

## Anchor Framework

Most developers use **Anchor**, which simplifies Solana development significantly:
- Provides macros to reduce boilerplate
- Handles serialization/deserialization
- Built-in security checks
- IDL generation for client integration

## Basic Workflow

1. **Write program** in Rust (with or without Anchor)
2. **Build** to BPF bytecode: `anchor build` or `cargo build-bpf`
3. **Test locally** with `solana-test-validator`
4. **Deploy** to devnet/mainnet: `anchor deploy` or `solana program deploy`
5. **Build frontend** using web3.js to interact with your program

## Key Differences from Ethereum

- Programs are stateless (state lives in accounts)
- Parallel transaction processing
- Much lower fees (~$0.00025 per tx)
- ~400ms block times
- No EVM - native Rust/BPF execution
