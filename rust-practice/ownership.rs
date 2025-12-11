// The Big Idea: Ownership
// Rust's killer feature. Every value has exactly one owner. When the owner goes out of scope, the value is dropped.
fn main() {
    let s1 = String::from("hello"); // s1 owns the string
    let s2 = s1;                    // ownership MOVES to s2
    // println!("{}", s1);          // ERROR! s1 no longer valid
    println("{}", s2);              // works fine
}