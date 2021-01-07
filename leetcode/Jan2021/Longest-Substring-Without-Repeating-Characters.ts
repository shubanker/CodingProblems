/**
Longest Substring Without Repeating Characters
Given a string s, find the length of the longest substring without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 */
function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>();
  let maxLength = 0;
  let subStrStart = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    const charIndex = charMap.get(char);
    if (charIndex !== undefined && charIndex >= subStrStart) {
      subStrStart = charIndex + 1;
    }
    maxLength = Math.max(maxLength, i - subStrStart + 1);
    charMap.set(char, i);
  }
  return maxLength;
}
