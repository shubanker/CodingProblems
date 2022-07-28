/**
Valid Anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
 

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
 */
function isAnagram(s: string, t: string): boolean {
  if (!s || s.length !== t.length) {
    return false;
  }
  const map = {};
  for (const c of s) {
    map[c] ??= 0;
    map[c]--;
  }
  for (const c of t) {
    if (!map[c]) {
      return false;
    }
    map[c]--;
  }
  for (const key in map) {
    if (map[key]) {
      return false;
    }
  }
  return true;
}
