/**
Ones and Zeroes
You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.

 

Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
 

Constraints:

1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100
 */

function findMaxForm(strs: string[], m: number, n: number): number {
  const binMap = strs.map((str) => {
    const map = { 1: 0, 0: 0 };
    for (let i = 0; i < str.length; i++) {
      map[str[i]]++;
    }
    return map;
  });
  const DP = new Array(m + 1).fill(0).map((d) => new Array(n + 1).fill(0));
  binMap.forEach((bins) => {
    for (let i = m; i >= bins[0]; i--) {
      for (let j = n; j >= bins[1]; j--) {
        DP[i][j] = Math.max(DP[i][j], DP[i - bins[0]][j - bins[1]] + 1);
      }
    }
  });
  return DP[m][n];
}

let ans: number = -1;
function findMaxForm_DK(strs: string[], m: number, n: number): number {
  const binMap = strs.map((str) => {
    const map = { 1: 0, 0: 0 };
    for (let i = 0; i < str.length; i++) {
      map[str[i]]++;
    }
    return map;
  });
  ans = -1;
  findMaxArrangment(binMap, m, n, 0, 0);
  return ans;
}
const findMaxArrangment = (binMap: { 0: number; 1: number }[], m: number, n: number, i: number, count: number) => {
  if (i >= binMap.length) {
    console.log(ans);
    ans = Math.max(ans, count);
    return;
  }
  if (count + (binMap.length - i) <= ans) {
    return;
  }
  if (binMap[i][0] <= m && binMap[i][1] <= n) {
    findMaxArrangment(binMap, m - binMap[i][0], n - binMap[i][1], i + 1, count + 1);
  }
  findMaxArrangment(binMap, m, n, i + 1, count);
};

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
