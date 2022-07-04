/**
Palindrome Partitioning II
Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
Example 2:

Input: s = "a"
Output: 0
Example 3:

Input: s = "ab"
Output: 1
 

Constraints:

1 <= s.length <= 2000
s consists of lower-case English letters only.
 */
function minCut(s: string): number {
  const isPalin = (l: number, r: number): boolean => {
    while (l < r) {
      if (s[l] !== s[r]) {
        return false;
      }
      l++, r--;
    }
    return true;
  };
  const DP = Array(s.length + 1).fill(-1);
  const dfs = (pos: number): number => {
    if (DP[pos] >= 0) {
      return DP[pos];
    }
    DP[pos] = Number.MAX_SAFE_INTEGER;
    for (let i = pos; i < s.length; i++) {
      if (isPalin(pos, i)) {
        DP[pos] = Math.min(DP[pos], dfs(i + 1) + 1);
      }
    }
    return DP[pos];
  };
  DP[s.length] = 0;
  return dfs(0) - 1;
}
