/**
Minimum Window Substring
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?
 */
function minWindow(s: string, t: string): string {
  if (t.length > s.length) {
    return "";
  }
  const tChars = new Set(t);
  //   let substr = "";
  //Amount of required chars with count from T in current window
  const requiredChars = {};
  //List of characters we dont have in current window.
  const underflowChars = new Set(tChars);
  for (let i = 0; i < t.length; i++) {
    requiredChars[t[i]] ??= 0;
    requiredChars[t[i]]--;
  }
  let left = 0,
    right = 0;
  const currentWindow: number[] = [];
  while (left <= right) {
    //No more valid windows now.
    if (right >= s.length && underflowChars.size > 0) {
      break;
    }
    //if we have enough chars in window, we can more left and store previous result.
    if (underflowChars.size === 0) {
      if (tChars.has(s[left])) {
        requiredChars[s[left]]--;
        if (requiredChars[s[left]] < 0) {
          underflowChars.add(s[left]);
        }
      }
      if (!currentWindow.length || right - left < currentWindow[1] - currentWindow[0]) {
        currentWindow[0] = left;
        currentWindow[1] = right;
      }
      left++;
    } else {
      if (tChars.has(s[right])) {
        requiredChars[s[right]]++;
        if (requiredChars[s[right]] >= 0) {
          underflowChars.delete(s[right]);
        }
      }
      if (right < s.length) {
        right++;
      }
    }
  }
  if (currentWindow.length) {
    return s.substr(currentWindow[0], currentWindow[1] - currentWindow[0]);
  }
  return "";
}
