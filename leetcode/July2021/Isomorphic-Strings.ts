/**
Isomorphic Strings

Solution
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true
 

Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
 */
function isIsomorphic(s: string, t: string): boolean {
  const charMap = new Map<string, string>();
  const tChars = new Set<string>();
  for (let i = 0; i < s.length; i++) {
    if (!charMap.has(s[i])) {
      if (tChars.has(t[i])) {
        return false;
      }
      charMap.set(s[i], t[i]);
      tChars.add(t[i]);
    } else if (charMap.get(s[i]) !== t[i]) {
      return false;
    }
  }
  return true;
}
