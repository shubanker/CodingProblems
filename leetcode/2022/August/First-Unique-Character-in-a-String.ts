/**
First Unique Character in a String
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

 

Example 1:

Input: s = "leetcode"
Output: 0
Example 2:

Input: s = "loveleetcode"
Output: 2
Example 3:

Input: s = "aabb"
Output: -1
 

Constraints:

1 <= s.length <= 10^5
s consists of only lowercase English letters.
 */
function firstUniqChar(s: string): number {
  let charmap = new Map<string, number[]>();
  for (let i = 0; i < s.length; i++) {
    if (charmap.has(s[i])) {
      charmap.get(s[i])[1] = 1;
    } else {
      charmap.set(s[i], [i, 0]);
    }
  }
  for (const ar of charmap.values()) {
    if (ar[1] === 0) {
      return ar[0];
    }
  }
  return -1;
}
