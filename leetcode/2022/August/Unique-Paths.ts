/**
Unique Paths
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
 

Constraints:

1 <= m, n <= 100

 */
function uniquePaths_(m: number, n: number): number {
  const memo: number[][] = Array(m + 1)
    .fill(undefined)
    .map(() => Array(n + 1).fill(0));
  memo[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      memo[i][j + 1] += memo[i][j];
      memo[i + 1][j] += memo[i][j];
    }
  }
  return memo[m - 1][n - 1];
}

// With a bit of caching.

let uniquePathsComputed = {
  memo: [],
  m: 0,
  n: 0,
};
function uniquePaths(m: number, n: number): number {
  if (m <= uniquePathsComputed.m && n <= uniquePathsComputed.n) {
    return uniquePathsComputed.memo[m - 1][n - 1];
  }
  const memo: number[][] = Array(m + 1)
    .fill(undefined)
    .map(() => Array(n + 1).fill(0));
  memo[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      memo[i][j + 1] += memo[i][j];
      memo[i + 1][j] += memo[i][j];
    }
  }
  uniquePathsComputed = { memo, m, n };
  return memo[m - 1][n - 1];
}

const uniquePathsComputed_ = {
  memo: [[1]],
  m: 1,
  n: 1,
};
function uniquePaths_2(m: number, n: number): number {
  const { memo } = uniquePathsComputed_;
  if (memo[m - 1]?.[n - 1]) {
    return memo[m - 1][n - 1];
  }
  for (let i = 0; i < m; i++) {
    for (let j = uniquePathsComputed_.n - 1; j < n; j++) {
      memo[i + 1] ??= Array(n).fill(0);
      memo[i][j + 1] ??= 0;
      memo[i + 1][j] ??= 0;
      memo[i][j + 1] += memo[i][j];
      memo[i + 1][j] += memo[i][j];
    }
  }
  memo[m] = Array(n).fill(0);
  memo.forEach((ar) => (ar[n] = 0));

  uniquePathsComputed_.n = Math.max(n, uniquePathsComputed_.n);
  uniquePathsComputed_.m = Math.max(m, uniquePathsComputed_.m);
  console.log(memo);
  return memo[m - 1][n - 1];
}
