/**
Longest Happy Prefix
A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).

Given a string s. Return the longest happy prefix of s .

Return an empty string if no such prefix exists.

 

Example 1:

Input: s = "level"
Output: "l"
Explanation: s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".
Example 2:

Input: s = "ababab"
Output: "abab"
Explanation: "abab" is the largest prefix which is also suffix. They can overlap in the original string.
Example 3:

Input: s = "leetcodeleet"
Output: "leet"
Example 4:

Input: s = "a"
Output: ""
 

Constraints:

1 <= s.length <= 10^5
s contains only lowercase English letters.
 */
function longestPrefix(s: string): string {
  const lps = Array(s.length).fill(0);
  let i = 1,
    len = 0;
  while (i < s.length) {
    if (s[i] === s[len]) {
      lps[i++] = ++len;
    } else {
      len = len == 0 ? (lps[i++] = len) : lps[len - 1];
    }
  }
  return s.substr(0, lps[s.length - 1]);
}
function longestPrefix_(s: string): string {
  const possiblePrefix = new Set<number>();
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[0]) {
      possiblePrefix.add(i);
    }
  }
  let lastSureShot = Infinity;
  for (let i = 1; i < s.length; i++) {
    const nextChar = s[i];
    for (const ind of possiblePrefix) {
      if (ind + i === s.length) {
        lastSureShot = ind;
      }
      if (s[ind + i] !== nextChar) {
        possiblePrefix.delete(ind);
      }
    }
  }
  return s.substr(lastSureShot, Math.min(...possiblePrefix));
}
console.log(longestPrefix("level"));
