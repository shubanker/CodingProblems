/**
200. Number of Islands
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
 */
const sides = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function numIslands(grid: string[][]): number {
  let islandCount = 0;
  const visitedPoints: Record<number, Record<number, true>> = {};
  const dfs = (i, j) => {
    if (grid[i]?.[j] === undefined) {
      return;
    }
    if (visitedPoints[i]?.[j]) {
      return;
    }
    visitedPoints[i] ??= {};
    visitedPoints[i][j] = true;
    sides.forEach(([a, b]) => {
      if (grid[i + a]?.[j + b] === "1") {
        dfs(i + a, j + b);
      }
    });
  };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1" && !visitedPoints[i]?.[j]) {
        dfs(i, j);
        islandCount++;
      }
    }
  }
  return islandCount;
}
