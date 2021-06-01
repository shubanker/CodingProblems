/**
Max Area of Island
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

 

Example 1:


Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
 */
function maxAreaOfIsland(grid: number[][]): number {
  let area = 0;
  grid.forEach((ar, i) => {
    ar.forEach((block, j) => {
      if (block) {
        area = Math.max(area, exploreIslandArea(grid, i, j));
      }
    });
  });
  return area;
}
const islandNeighbours = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];
const exploreIslandArea = (grid: number[][], i: number, j: number) => {
  let area = 0;
  let stack = [`${i},${j}`];
  while (stack.length) {
    const nextStack = new Set<string>();
    stack.forEach((position) => {
      const [i, j] = position.split(",").map((c) => +c);
      if (grid[i]?.[j]) {
        grid[i][j] = 0;
        area++;
        islandNeighbours.forEach((neighbour) => {
          const x = neighbour[0] + i;
          const y = neighbour[1] + j;
          if (grid[x]?.[y]) {
            nextStack.add(`${x},${y}`);
          }
        });
      }
    });
    stack = [...nextStack];
  }
  return area;
};
console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ])
);
