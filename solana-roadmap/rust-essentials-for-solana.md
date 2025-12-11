# Rust Essentials for Solana

A focused Rust crash course covering only what matters for Solana development.

---

## 1. The Big Idea: Ownership

Rust's killer feature. Every value has exactly one owner. When the owner goes out of scope, the value is dropped.

```rust
fn main() {
    let s1 = String::from("hello");  // s1 owns the string
    let s2 = s1;                      // ownership MOVES to s2
    // println!("{}", s1);            // ERROR! s1 no longer valid
    println!("{}", s2);               // works fine
}
```

**Why this matters for Solana:** Account data has owners. You'll constantly think about who owns what and who can modify it.

---

## 2. Borrowing (References)

Instead of moving ownership, you can *borrow* with `&`:

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);  // borrow s1
    println!("{} has length {}", s1, len);  // s1 still valid!
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

Mutable borrows with `&mut`:

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);  // prints "hello, world"
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

**Rule:** One mutable borrow OR many immutable borrows. Never both.

---

## 3. Structs (You'll use these constantly)

```rust
struct Counter {
    count: u64,
    authority: Pubkey,  // in Solana, this would be an account owner
}

impl Counter {
    fn increment(&mut self) {
        self.count += 1;
    }

    fn new(authority: Pubkey) -> Self {
        Counter {
            count: 0,
            authority,
        }
    }
}
```

---

## 4. Enums and Pattern Matching

```rust
enum Status {
    Active,
    Paused,
    Completed { winner: String },  // variants can hold data
}

fn check_status(status: Status) {
    match status {
        Status::Active => println!("Game on!"),
        Status::Paused => println!("Taking a break"),
        Status::Completed { winner } => println!("{} won!", winner),
    }
}
```

**Critical for Solana:** `Result` and `Option` are enums you'll use everywhere.

---

## 5. Result and Option (Error Handling)

```rust
// Option: might have a value, might not
fn find_user(id: u64) -> Option<String> {
    if id == 1 {
        Some(String::from("Alice"))
    } else {
        None
    }
}

// Result: operation might succeed or fail
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    // The ? operator: return early if error
    let result = divide(10, 2)?;  // unwraps Ok, or returns Err

    // Or handle explicitly
    match divide(10, 0) {
        Ok(val) => println!("Result: {}", val),
        Err(e) => println!("Error: {}", e),
    }
}
```

**Solana uses this everywhere:** Every instruction returns `Result<()>`.

---

## 6. Attributes and Macros (Anchor uses tons of these)

```rust
#[derive(Debug, Clone)]  // auto-implement traits
struct MyStruct {
    value: u64,
}

#[account]  // Anchor macro - marks this as a Solana account
pub struct Counter {
    pub count: u64,
}
```

---

## Quick Exercise

Predict what this code does:

```rust
struct Wallet {
    balance: u64,
}

impl Wallet {
    fn deposit(&mut self, amount: u64) {
        self.balance += amount;
    }

    fn transfer(&mut self, to: &mut Wallet, amount: u64) -> Result<(), String> {
        if self.balance < amount {
            return Err(String::from("Insufficient funds"));
        }
        self.balance -= amount;
        to.balance += amount;
        Ok(())
    }
}

fn main() {
    let mut alice = Wallet { balance: 100 };
    let mut bob = Wallet { balance: 50 };

    alice.transfer(&mut bob, 30)?;
}
```

**Questions:**
- What are Alice and Bob's final balances?
- What happens if Alice tries to transfer 200?

---

## Key Takeaways

| Concept | Why It Matters for Solana |
|---------|---------------------------|
| Ownership | Account ownership model mirrors this |
| Borrowing | Passing account references between functions |
| Structs | Every account is a struct |
| Enums | Instruction types, status fields |
| Result/Option | All instructions return Result |
| Macros | Anchor framework is macro-heavy |
