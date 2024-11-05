/**
2370. Longest Ideal Subsequence
You are given a string s consisting of lowercase letters and an integer k. We call a string t ideal if the following conditions are satisfied:

t is a subsequence of the string s.
The absolute difference in the alphabet order of every two adjacent letters in t is less than or equal to k.
Return the length of the longest ideal string.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

Note that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of 'a' and 'z' is 25, not 1.

 

Example 1:

Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.
Example 2:

Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.
 

Constraints:

1 <= s.length <= 105
0 <= k <= 25
s consists of lowercase English letters.
 */

function longestIdealString_(s: string, k: number): number {
  const DP = Array(s.length).fill(1);
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (Math.abs(s.charCodeAt(j) - s.charCodeAt(i)) <= k) {
        // DP[i] = Math.max(compute(j) + 1, DP[i]);
        DP[j] = Math.max(DP[i] + 1, DP[j]);
      }
    }
  }
  let max = DP[0];
  for (let i = 1; i < DP.length; i++) {
    max = max > DP[i] ? max : DP[i];
  }
  return max;
}
function longestIdealString__(s: string, k: number): number {
  const DP = Array(s.length).fill(-1);
  const compute = (index: number) => {
    if (DP[index] + 1) {
      return DP[index];
    }
    DP[index] = 1;
    let j = index + 1;
    while (j < s.length) {
      if (Math.abs(s.charCodeAt(j) - s.charCodeAt(index)) <= k) {
        DP[index] = Math.max(compute(j) + 1, DP[index]);
      }
      j++;
    }
    return DP[index];
  };
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    maxLen = Math.max(compute(i), maxLen);
  }
  return maxLen;
}
function longestIdealString(s: string, k: number): number {
  const DP = Array(s.length).fill(-1);
  let maxStack = 0,
    filledCount = 0;
  const checkIfSeries = (i: number, j: number) => Math.abs(s.charCodeAt(j) - s.charCodeAt(i)) <= k;
  const compute = (index: number, previous: number = null) => {
    if (DP[index] + 1) {
      return DP[index];
    }
    let last = previous;
    DP[index] = 1;
    let j = index + 1;
    let stack = [];
    while (j < s.length) {
      if (checkIfSeries(index, j)) {
        // DP[index] = Math.max(compute(j) + 1, DP[index]);
        if (last !== null && checkIfSeries(last, j)) {
          stack.push(last);
          last = j;
        } else {
          let previousCompactiable = null;
          for (let i = stack.length - 1; i >= 0; i--) {
            if (checkIfSeries(stack[i], j)) {
              compute(j, stack[i]);
              break;
            }
          }
          DP[index] = previous === null ? Math.max(compute(j, index) + 1, DP[index]) : DP[previous] + 1;
          for (let i = 0; i < stack.length; i++) {
            filledCount++;
            DP[stack[i]] = Math.max(DP[stack[i - 1]] ?? DP[index], DP[stack[i]]);
          }
          if (stack.length) {
            maxStack = Math.max(maxStack, stack.length);
            console.log(`stack len ${stack.length}, max ${maxStack}, filled ${filledCount}, remaining ${s.length - filledCount}`);
          }
          stack.length = 0;
          last = null;
        }
      }
      j++;
    }
    return DP[index];
  };
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    maxLen = Math.max(compute(i), maxLen);
  }
  return maxLen;
}
