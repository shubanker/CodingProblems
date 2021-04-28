/**
Unique Paths II
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and space is marked as 1 and 0 respectively in the grid.

 

Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
 */
const memoMap = new Map<string, number>();
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  memoMap.clear();
  uniquePathsWithObstaclesRec(obstacleGrid, 0, 0);
  return memoMap.get(`0,0`) ?? 0;
}
const uniquePathsWithObstaclesRec = (obstacleGrid: number[][], i: number, j: number) => {
  if (obstacleGrid[i][j] === 1) {
    return 0;
  }
  const key = `${i},${j}`;
  if (!memoMap.has(key)) {
    if (i === obstacleGrid.length - 1 && j === obstacleGrid[0].length - 1) {
      memoMap.set(key, 1);
      return 1;
    }
    let count = 0;
    if (obstacleGrid[i + 1]?.[j] === 0) {
      count += uniquePathsWithObstaclesRec(obstacleGrid, i + 1, j);
    }
    if (obstacleGrid[i][j + 1] === 0) {
      count += uniquePathsWithObstaclesRec(obstacleGrid, i, j + 1);
    }
    memoMap.set(key, count);
  }
  return memoMap.get(key);
};
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ])
);
