/**
1289. Minimum Falling Path Sum II
Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two elements chosen in adjacent rows are in the same column.

 

Example 1:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.
Example 2:

Input: grid = [[7]]
Output: 7
 

Constraints:

n == grid.length == grid[i].length
1 <= n <= 200
-99 <= grid[i][j] <= 99
 */
function minFallingPathSum(grid: number[][]): number {
  const minVals = [];
  const calcMinVals = (i: number) => {
    let min1 = 0,
      min2 = 1;
    if (DP[min1] > DP[min2]) {
      [min1, min2] = [min2, min1];
    }
    for (i = 2; i < grid.length; i++) {
      if (DP[i] < DP[min1]) {
        min2 = min1;
        min1 = i;
      } else if (DP[i] < DP[min2]) {
        min2 = i;
      }
    }
    minVals.length = 0;
    minVals.push(min1, min2);
  };
  let DP = grid[0].slice();
  for (let i = 1; i < grid.length; i++) {
    calcMinVals(i - 1);
    const next = [];
    for (let j = 0; j < grid.length; j++) {
      next[j] = grid[i][j] + DP[j === minVals[0] ? minVals[1] : minVals[0]];
    }
    DP = next;
  }
  // console.log(DP);
  return Math.min(...DP);
}

// -108
console.log(
  minFallingPathSum([
    [-71, -40, 66, -30],
    [89, 16, -16, -1], // -72
    [-10, 85, -38, 96], // -110
    [59, 2, 67, 49], // 112
  ])
);
