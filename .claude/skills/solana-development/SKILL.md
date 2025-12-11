---
name: solana-anchor-development
description: Build Solana programs using Anchor framework and Rust. Covers program structure, accounts, PDAs, instructions, transactions, web3.js clients, and testing. Use when writing Solana smart contracts, debugging transactions, creating blockchain dApps, or working with SPL tokens.
---

# Solana Development

## Core Concepts

### Programs (Smart Contracts)
- Written primarily in **Rust** (most common) or C/C++
- Compiled to BPF (Berkeley Packet Filter) bytecode
- Stateless - they read/write to separate account data structures
- Programs don't store state internally; they modify account data

### Accounts
- Store all state on Solana (data, tokens, program code)
- Must pay "rent" (or be rent-exempt with minimum balance)
- All accounts accessed must be declared upfront (enables parallel processing)

### Transactions
- Contain one or more instructions
- Instructions specify which program to call and which accounts to use
- ~400ms block times, ~$0.00025 per transaction

## Development Stack

| Layer | Tools |
|-------|-------|
| On-chain programs | Rust + Anchor framework |
| Client/Frontend | JavaScript/TypeScript with `@solana/web3.js` or `@solana/kit` |
| Local testing | `solana-test-validator` |
| Deployment | Solana CLI |

## Anchor Framework

Most developers use **Anchor**, which simplifies Solana development:
- Provides macros to reduce boilerplate
- Handles serialization/deserialization
- Built-in security checks
- IDL generation for client integration

### Basic Anchor Program Structure

```rust
use anchor_lang::prelude::*;

declare_id!("YourProgramIdHere...");

#[program]
pub mod my_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct MyAccount {
    pub data: u64,
}
```

### Common Anchor Macros

- `#[account]` - Define account data structures
- `#[program]` - Define program instructions
- `#[derive(Accounts)]` - Define instruction context
- `#[account(init, payer, space)]` - Initialize new accounts
- `#[account(mut)]` - Mark accounts as mutable
- `#[account(seeds, bump)]` - PDA derivation

## PDAs (Program Derived Addresses)

```rust
#[derive(Accounts)]
pub struct CreatePDA<'info> {
    #[account(
        init,
        seeds = [b"my-seed", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + 32
    )]
    pub pda_account: Account<'info, PDAData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

## Basic Workflow

1. **Write program** in Rust with Anchor: `anchor init my_project`
2. **Build** to BPF bytecode: `anchor build`
3. **Test locally** with `solana-test-validator` or `anchor test`
4. **Deploy** to devnet/mainnet: `anchor deploy`
5. **Build frontend** using web3.js to interact with your program

## Client Integration (web3.js)

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MyProgram } from "../target/types/my_program";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.MyProgram as Program<MyProgram>;

// Call an instruction
await program.methods
  .initialize(new anchor.BN(42))
  .accounts({
    myAccount: myAccountKeypair.publicKey,
    user: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
  })
  .signers([myAccountKeypair])
  .rpc();
```

## Security Checklist

1. **Validate account ownership** - Check accounts are owned by expected programs
2. **Verify signers** - Ensure required signatures are present
3. **Check account discriminators** - Anchor handles this automatically
4. **Validate PDAs** - Verify seeds and bumps match expected values
5. **Handle arithmetic safely** - Use checked math to prevent overflows
6. **Validate input data** - Don't trust user-provided values

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `AccountNotInitialized` | Account doesn't exist | Initialize account first |
| `ConstraintSeeds` | PDA seeds don't match | Verify seed derivation |
| `InsufficientFunds` | Not enough SOL for rent | Fund the payer account |
| `AccountOwnedByWrongProgram` | Wrong program owns account | Check account ownership |

## Key Differences from Ethereum

- Programs are stateless (state lives in accounts)
- Parallel transaction processing
- Much lower fees (~$0.00025 per tx)
- ~400ms block times
- No EVM - native Rust/BPF execution
