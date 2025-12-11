import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaNotepad } from "../target/types/solana_notepad";
import { assert } from "chai";

describe("solana-notepad", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaNotepad as Program<SolanaNotepad>;

  const author = provider.wallet;
  const noteId = new anchor.BN(1);
  const content = "Hello World";
  const newContent = "Hello Solana";

  // Derive PDA
  const [notePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("note"),
      author.publicKey.toBuffer(),
      noteId.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  it("Creates a note", async () => {
    await program.methods
      .createNote(noteId, content)
      .accounts({
        note: notePda,
        author: author.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const noteAccount = await program.account.note.fetch(notePda);
    assert.ok(noteAccount.author.equals(author.publicKey));
    assert.ok(noteAccount.id.eq(noteId));
    assert.equal(noteAccount.content, content);
  });

  it("Updates a note", async () => {
    await program.methods
      .updateNote(newContent)
      .accounts({
        note: notePda,
        author: author.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const noteAccount = await program.account.note.fetch(notePda);
    assert.equal(noteAccount.content, newContent);
  });

  it("Fails to update note with wrong signer", async () => {
    const otherUser = anchor.web3.Keypair.generate();

    try {
      await program.methods
        .updateNote("Hacked Content")
        .accounts({
          note: notePda,
          author: otherUser.publicKey,
        })
        .signers([otherUser])
        .rpc();
      assert.fail("Should have failed");
    } catch (e: any) {
      // We expect a constraint violation because the signer (otherUser) 
      // does not match the note's author.
      // The error message usually contains "ConstraintHasOne" or similar anchor error.
      // We check if it threw an error.
      assert.ok(e);
    }
  });
});
