export type SolanaNotepad = {
    "version": "0.1.0",
    "name": "solana_notepad",
    "instructions": [
        {
            "name": "createNote",
            "accounts": [
                {
                    "name": "note",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "author",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "id",
                    "type": "u64"
                },
                {
                    "name": "content",
                    "type": "string"
                }
            ]
        },
        {
            "name": "updateNote",
            "accounts": [
                {
                    "name": "note",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "author",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "content",
                    "type": "string"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "Note",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "author",
                        "type": "publicKey"
                    },
                    {
                        "name": "id",
                        "type": "u64"
                    },
                    {
                        "name": "content",
                        "type": "string"
                    }
                ]
            }
        }
    ]
};
