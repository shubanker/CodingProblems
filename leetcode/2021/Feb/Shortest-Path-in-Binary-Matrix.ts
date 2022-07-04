import { runTests } from "../../test";

/**
Shortest Path in Binary Matrix
In an N by N square grid, each cell is either empty (0) or blocked (1).

A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:

Adjacent cells C_i and C_{i+1} are connected 8-directionally (ie., they are different and share an edge or corner)
C_1 is at location (0, 0) (ie. has value grid[0][0])
C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])
If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
Return the length of the shortest such clear path from top-left to bottom-right.  If such a path does not exist, return -1.

 

Example 1:

Input: [[0,1],[1,0]]


Output: 2

Example 2:

Input: [[0,0,0],[1,1,0],[1,1,0]]


Output: 4

 

Note:

1 <= grid.length == grid[0].length <= 100
grid[r][c] is 0 or 1
 */
function shortestPathBinaryMatrix(grid: number[][]): number {
  if (grid[0]?.[0] !== 0) {
    return -1;
  }
  if (grid.length === 1) {
    return 1;
  }
  let nextQueue = ["0,0"];
  const visited = new Set<string>();
  let steps = 0;
  const neighboursCordinates = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  while (nextQueue.length) {
    const nextSet = new Set<string>();
    steps++;

    for (let i = 0; i < nextQueue.length; i++) {
      if (visited.has(nextQueue[i])) {
        continue;
      }
      const [x, y] = nextQueue[i].split(",").map((c) => +c);
      visited.add(nextQueue[i]);
      for (let j = 0; j < neighboursCordinates.length; j++) {
        const [a, b] = neighboursCordinates[j];
        const nextX = a + x;
        const nextY = b + y;
        const nextIndex = `${nextX},${nextY}`;
        const nextValid = grid[nextX]?.[nextY] === 0;
        if (nextX === grid.length - 1 && nextY === grid[0].length - 1) {
          return nextValid ? steps + 1 : -1;
        }
        if (nextValid && !visited.has(nextIndex)) {
          nextSet.add(nextIndex);
        }
      }
    }
    nextQueue = [...nextSet];
  }
  return -1;
}

function shortestPathBinaryMatrix_withSorting(grid: number[][]): number {
  if (grid[0]?.[0] !== 0) {
    return -1;
  }
  if (grid.length === 1) {
    return 1;
  }
  let nextQueue = ["0,0"];
  const visited = new Set<string>();
  const cordinatesMap = new Map<string, { x: number; y: number }>();
  cordinatesMap.set(nextQueue[0], { x: 0, y: 0 });
  let steps = 0;
  const neighboursCordinates = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  while (nextQueue.length) {
    nextQueue.sort((a, b) => {
      const c1 = cordinatesMap.get(a);
      const c2 = cordinatesMap.get(b);
      return (
        Math.sqrt(Math.pow(c1.x - grid.length - 1, 2) + Math.pow(c1.y - grid.length - 1, 2)) -
        Math.sqrt(Math.pow(c2.x - grid.length - 1, 2) + Math.pow(c2.y - grid.length - 1, 2))
      );
    });
    const nextSet = new Set<string>();
    steps++;

    for (let i = 0; i < nextQueue.length; i++) {
      if (visited.has(nextQueue[i])) {
        continue;
      }
      const { x, y } = cordinatesMap.get(nextQueue[i]);
      visited.add(nextQueue[i]);
      for (let j = 0; j < neighboursCordinates.length; j++) {
        const [a, b] = neighboursCordinates[j];
        const nextX = a + x;
        const nextY = b + y;
        const nextIndex = `${nextX},${nextY}`;
        cordinatesMap.set(nextIndex, { x: nextX, y: nextY });
        const nextValid = grid[nextX]?.[nextY] === 0;
        if (nextX === grid.length - 1 && nextY === grid[0].length - 1) {
          return nextValid ? steps + 1 : -1;
        }
        if (nextValid && !visited.has(nextIndex)) {
          nextSet.add(nextIndex);
        }
      }
    }
    nextQueue = [...nextSet];
  }
  return -1;
}
console.log(shortestPathBinaryMatrix([[0]]));
console.log(
  runTests(
    [
      {
        arguments: [[[0]]],
        output: 1,
      },
      {
        arguments: [
          [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
          ],
        ],
        output: 3,
      },
      {
        arguments: [
          [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
          ],
        ],
        output: -1,
      },
      {
        arguments: [
          [
            [0, 1],
            [1, 0],
          ],
        ],
        output: 2,
      },
      {
        arguments: [
          [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 0],
          ],
        ],
        output: 4,
      },
    ],
    shortestPathBinaryMatrix
  )
);
