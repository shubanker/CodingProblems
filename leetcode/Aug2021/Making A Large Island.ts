/**
Making A Large Island
You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

 

Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] is either 0 or 1.
 */
interface islandGroup {
  size: number;
  hasZeroNeig: boolean;
}

//Optimised using array instead of map.
function largestIsland(grid: number[][]): number {
  const islandLinks = new Map<string, Set<islandGroup>>();
  const getKey = (i: number, j: number): string => `${i},${j}`;
  const checked = new Set<string>();
  const gridChecked = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(0));
  const neighbours = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const DFSIslands = (i: number, j: number, group: islandGroup): void => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return;
    }
    if (gridChecked[i][j]) {
      return;
    }
    if (grid[i]?.[j] !== 1) {
      const key = getKey(i, j);
      if (grid[i]?.[j] === 0) {
        group.hasZeroNeig = true;
        if (!islandLinks.has(key)) {
          islandLinks.set(key, new Set());
        }
        islandLinks.get(key).add(group);
      } else {
        checked.add(key);
        gridChecked[i][j] = 1;
      }
      return;
    }
    gridChecked[i][j] = 1;
    group.size++;
    neighbours.forEach(([dx, dy]) => {
      DFSIslands(i + dx, j + dy, group);
    });
  };
  let maxSize = 1;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1 && gridChecked[i][j] == 0) {
        const group: islandGroup = { size: 0, hasZeroNeig: false };
        DFSIslands(i, j, group);
        maxSize = Math.max(maxSize, group.size + +group.hasZeroNeig);
      }
    }
  }
  for (let [_, group] of islandLinks) {
    if (group.size < 2) {
      continue;
    }
    let accumSize = 1;
    group.forEach(({ size }) => {
      accumSize += size;
    });
    maxSize = Math.max(maxSize, accumSize);
  }
  return maxSize;
}
function largestIsland_(grid: number[][]): number {
  const islandLinks = new Map<string, Set<islandGroup>>();
  const getKey = (i: number, j: number): string => `${i},${j}`;
  const checked = new Set<string>();
  const neighbours = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const DFSIslands = (i: number, j: number, group: islandGroup): void => {
    const key = getKey(i, j);
    if (checked.has(key)) {
      return;
    }
    if (grid[i]?.[j] !== 1) {
      if (grid[i]?.[j] === 0) {
        group.hasZeroNeig = true;
        if (!islandLinks.has(key)) {
          islandLinks.set(key, new Set());
        }
        islandLinks.get(key).add(group);
      } else {
        checked.add(key);
      }
      return;
    }
    checked.add(key);
    group.size++;
    neighbours.forEach(([dx, dy]) => {
      DFSIslands(i + dx, j + dy, group);
    });
  };
  let maxSize = 1;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1 && !checked.has(getKey(i, j))) {
        const group: islandGroup = { size: 0, hasZeroNeig: false };
        DFSIslands(i, j, group);
        maxSize = Math.max(maxSize, group.size + +group.hasZeroNeig);
      }
    }
  }
  for (let [_, group] of islandLinks) {
    if (group.size < 2) {
      continue;
    }
    let accumSize = 1;
    group.forEach(({ size }) => {
      accumSize += size;
    });
    maxSize = Math.max(maxSize, accumSize);
  }
  return maxSize;
}
console.log(
  largestIsland([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0],
  ])
);
