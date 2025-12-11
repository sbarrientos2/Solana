"use client";

import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "@/utils/anchor";
import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export const NoteManager: FC = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [notes, setNotes] = useState<any[]>([]);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNoteId, setNewNoteId] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        if (!wallet.publicKey) return;
        try {
            const program = getProgram(connection, wallet);
            // In a real app, you might filter by author, but fetchAll returns all accounts of that type
            const allNotes = await program.account.note.all([
                {
                    memcmp: {
                        offset: 8, // Discriminator
                        bytes: wallet.publicKey.toBase58(),
                    },
                },
            ]);
            setNotes(allNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        if (wallet.connected) {
            fetchNotes();
        }
    }, [wallet.connected, wallet.publicKey]);

    const createNote = async () => {
        if (!wallet.publicKey || !newNoteId || !newNoteContent) return;
        setLoading(true);
        try {
            const program = getProgram(connection, wallet);
            const id = new BN(newNoteId);

            const [notePda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("note"),
                    wallet.publicKey.toBuffer(),
                    id.toArrayLike(Buffer, "le", 8),
                ],
                program.programId
            );

            await program.methods
                .createNote(id, newNoteContent)
                .accounts({
                    note: notePda,
                    author: wallet.publicKey,
                })
                .rpc();

            await fetchNotes();
            setNewNoteContent("");
            setNewNoteId("");
        } catch (error) {
            console.error("Error creating note:", error);
            alert("Error creating note: " + error);
        } finally {
            setLoading(false);
        }
    };

    const updateNote = async (notePublicKey: PublicKey, id: BN, currentContent: string) => {
        const newContent = prompt("Enter new content:", currentContent);
        if (newContent === null || newContent === currentContent) return;

        setLoading(true);
        try {
            const program = getProgram(connection, wallet);

            // Re-derive PDA to be sure (or just use the public key passed in)
            // The instruction expects the PDA as 'note'

            await program.methods
                .updateNote(newContent)
                .accounts({
                    note: notePublicKey,
                    author: wallet.publicKey!,
                })
                .rpc();

            await fetchNotes();
        } catch (error) {
            console.error("Error updating note:", error);
            alert("Error updating note: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Notes</h2>

            <div className="mb-8 p-4 border rounded bg-gray-800">
                <h3 className="text-xl mb-2">Create New Note</h3>
                <div className="flex gap-2 mb-2">
                    <input
                        type="number"
                        placeholder="Note ID (e.g. 1)"
                        value={newNoteId}
                        onChange={(e) => setNewNoteId(e.target.value)}
                        className="p-2 rounded text-black"
                    />
                    <input
                        type="text"
                        placeholder="Content"
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className="p-2 rounded text-black flex-grow"
                    />
                </div>
                <button
                    onClick={createNote}
                    disabled={loading || !wallet.connected}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Note"}
                </button>
            </div>

            <div className="grid gap-4">
                {notes.map((note) => (
                    <div key={note.publicKey.toString()} className="p-4 border rounded bg-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-400">ID: {note.account.id.toString()}</p>
                                <p className="text-lg">{note.account.content}</p>
                            </div>
                            <button
                                onClick={() => updateNote(note.publicKey, note.account.id, note.account.content)}
                                disabled={loading}
                                className="text-sm bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
                {notes.length === 0 && <p>No notes found.</p>}
            </div>
        </div>
    );
};
