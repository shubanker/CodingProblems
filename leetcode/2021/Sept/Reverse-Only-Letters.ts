/**
Reverse Only Letters
Given a string s, reverse the string according to the following rules:

All the characters that are not English letters remain in the same position.
All the English letters (lowercase or uppercase) should be reversed.
Return s after reversing it.

 

Example 1:

Input: s = "ab-cd"
Output: "dc-ba"
Example 2:

Input: s = "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
Example 3:

Input: s = "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
 

Constraints:

1 <= s.length <= 100
s consists of characters with ASCII values in the range [33, 122].
s does not contain '\"' or '\\'.
 */
function reverseOnlyLetters(s: string): string {
  let op = "";
  let endPointer = s.length - 1;
  const isAlphabet = (c: string) => {
    c = c?.toLowerCase();
    return c >= "a" && c <= "z";
  };
  for (let i = 0; i < s.length; i++) {
    while (endPointer >= 0 && !isAlphabet(s[endPointer])) {
      endPointer--;
    }
    while (i < s.length && !isAlphabet(s[i])) {
      op += s[i];
      i++;
    }
    if (endPointer >= 0) {
      op += s[endPointer--];
    }
  }
  return op;
}
console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!"));
