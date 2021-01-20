/**
Longest Palindromic Substring
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
Example 3:

Input: s = "a"
Output: "a"
Example 4:

Input: s = "ac"
Output: "a"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters (lower-case and/or upper-case),
 */
function longestPalindrome(s: string): string {
  let maxPalin = "";
  for (let index = 0; index < s.length && (s.length - index) * 2 > maxPalin.length; index++) {
    maxPalin = getMaxLenStr(
      maxPalin,
      getLongestPOintWithCenter(s, index, index),
      getLongestPOintWithCenter(s, index, index + 1)
    );
  }
  return maxPalin;
}
const getMaxLenStr = (...strs: string[]) => {
  return strs.reduce((a, b) => (a.length > b.length ? a : b));
};
const getLongestPOintWithCenter = (s: string, back: number, front: number) => {
  while (s[back] && s[back] === s[front]) {
    back--;
    front++;
  }
  return s.slice(back + 1, front);
};
