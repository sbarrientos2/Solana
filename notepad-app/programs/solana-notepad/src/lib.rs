use anchor_lang::prelude::*;

declare_id!("4SEcSb6otAn34knmh24DkFkijccdG522t9Kd7XhUXW3y");

#[program]
pub mod solana_notepad {
    use super::*;

    pub fn create_note(ctx: Context<CreateNote>, id: u64, content: String) -> Result<()> {
        let note = &mut ctx.accounts.note;
        note.author = ctx.accounts.author.key();
        note.id = id;
        note.content = content;
        Ok(())
    }

    pub fn update_note(ctx: Context<UpdateNote>, content: String) -> Result<()> {
        let note = &mut ctx.accounts.note;
        // The `has_one = author` constraint in the Accounts struct ensures that
        // ctx.accounts.author.key() matches note.author.
        note.content = content;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id: u64, content: String)]
pub struct CreateNote<'info> {
    // We initialize the note account with a PDA.
    // Seeds: "note", author's public key, and the unique ID for the note.
    #[account(
        init,
        payer = author,
        // Space calculation:
        // 8 bytes: Account discriminator (Anchor internal)
        // 32 bytes: author (Pubkey)
        // 8 bytes: id (u64)
        // 4 bytes: String prefix (length of string)
        // content.len(): The actual bytes of the string
        space = 8 + 32 + 8 + 4 + content.len(),
        seeds = [b"note", author.key().as_ref(), id.to_le_bytes().as_ref()],
        bump
    )]
    pub note: Account<'info, Note>,

    // The user paying for the account creation. Must be a signer and mutable (to deduct lamports).
    #[account(mut)]
    pub author: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(content: String)]
pub struct UpdateNote<'info> {
    // We verify the PDA seeds to ensure we are updating the correct account.
    // We also check `has_one = author` to ensure the signer is the owner of the note.
    #[account(
        mut,
        has_one = author,
        seeds = [b"note", author.key().as_ref(), note.id.to_le_bytes().as_ref()],
        bump,
        realloc = 8 + 32 + 8 + 4 + content.len(),
        realloc::payer = author,
        realloc::zero = false
    )]
    pub note: Account<'info, Note>,

    #[account(mut)]
    pub author: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Note {
    pub author: Pubkey,
    pub id: u64,
    pub content: String,
}
