/**
To Lower Case
Given a string s, return the string after replacing every uppercase letter with the same lowercase letter.

 

Example 1:

Input: s = "Hello"
Output: "hello"
Example 2:

Input: s = "here"
Output: "here"
Example 3:

Input: s = "LOVELY"
Output: "lovely"
 

Constraints:

1 <= s.length <= 100
s consists of printable ASCII characters.
 */
function toLowerCase(s: string): string {
  // return s.toLowerCase();
  let op = "";
  const start = "A".charCodeAt(0);
  const end = "Z".charCodeAt(0);
  const diff = "a".charCodeAt(0) - start;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    const ascII = s.charCodeAt(i);
    if (ascII >= start && ascII <= end) {
      char = String.fromCharCode(ascII + diff);
    }
    op += char;
  }
  return op;
}
