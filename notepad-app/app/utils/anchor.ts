import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Idl, setProvider } from "@coral-xyz/anchor";
import idl from "./solana_notepad.json";
import { SolanaNotepad } from "@/types/solana_notepad";

const programId = new PublicKey("4SEcSb6otAn34knmh24DkFkijccdG522t9Kd7XhUXW3y");

export const getProgram = (connection: Connection, wallet: any) => {
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: "processed",
    });
    setProvider(provider);
    return new Program(idl as Idl, provider) as unknown as Program<SolanaNotepad>;
};
