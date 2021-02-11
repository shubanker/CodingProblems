/**
Valid Anagram

Solution
Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
 */
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  const map = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    const counter = map.get(s[i]) ?? 0;
    map.set(s[i], counter + 1);
  }
  for (let i = 0; i < t.length; i++) {
    if (!map.get(t[i])) {
      return false;
    }
    map.set(t[i], map.get(t[i]) - 1);
  }
  return [...map.values()].every((d) => d === 0);
}
