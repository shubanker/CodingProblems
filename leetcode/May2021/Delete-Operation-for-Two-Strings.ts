/**
Delete Operation for Two Strings
Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.

In one step, you can delete exactly one character in either string.

 

Example 1:

Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
Example 2:

Input: word1 = "leetcode", word2 = "etco"
Output: 4
 

Constraints:

1 <= word1.length, word2.length <= 500
word1 and word2 consist of only lowercase English letters.
 */

function minDistance(word1: string, word2: string): number {
  const DP = Array(word1.length + 1)
    .fill(0)
    .map((c) => Array(word2.length + 1).fill(-1));
  const lcs = (w1: number, w2: number) => {
    if (DP[w1][w2] === -1) {
      if (w1 === 0 || w2 == 0) {
        DP[w1][w2] = 0;
      } else {
        if (word1[w1 - 1] == word2[w2 - 1]) {
          DP[w1][w2] = 1 + lcs(w1 - 1, w2 - 1);
        } else {
          DP[w1][w2] = Math.max(lcs(w1 - 1, w2), lcs(w1, w2 - 1));
        }
      }
    }
    return DP[w1][w2];
  };
  lcs(word1.length, word2.length);
  return word1.length + word2.length - DP[word1.length][word2.length] * 2;
}
