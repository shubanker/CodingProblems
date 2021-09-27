/**
Regular Expression Matching

Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*' where: 

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
Example 4:

Input: s = "aab", p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
Example 5:

Input: s = "mississippi", p = "mis*is*p*."
Output: false
 

Constraints:

0 <= s.length <= 20
0 <= p.length <= 30
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
 */
function isMatch(s: string, p: string): boolean {
  const pattern = splitPattern(p);
  let strPointer = 0;
  const splitStrings: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    const patt = pattern[i];
    if (patt.star) {
      let str = "";
      while (isCharValid(patt.char, s.charAt(strPointer))) {
        str += s.charAt(strPointer);
        i++;
      }
      splitStrings.push(str);
    } else {
      if (isCharValid(patt.char, s.charAt(strPointer))) {
        splitStrings.push(s.charAt(strPointer));
      } else {
      }
    }
  }
  return false;
}

const isCharValid = (patt: string, char: string) => char === patt || patt == ".";
const splitPattern = (p: string) => {
  const pattern: custPattern[] = [];
  for (let i = 0; i < p.length; i++) {
    const pat: custPattern = { star: false, char: p.charAt(i) };
    if (p[i + 1] === "*") {
      pat.star = true;
      i++;
    }
    pattern.push(pat);
  }
  return pattern;
};
interface custPattern {
  star: boolean;
  char?: string;
}
