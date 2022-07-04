/**
01 Matrix
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

 

Example 1:


Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
Example 2:


Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 10^4
1 <= m * n <= 10^4
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
 */
function updateMatrix(mat: number[][]): number[][] {
  const getKey = (...args: any) => args.join(",");
  let bfsStack = new Set<string>();

  const op: number[][] = Array(mat.length)
    .fill(0)
    .map((_, i) =>
      Array(mat[0].length)
        .fill(0)
        .map((_, j) => {
          if (mat[i][j] === 1) {
            return Number.MAX_SAFE_INTEGER;
          }
          bfsStack.add(getKey(i, j));
          return 0;
        })
    );
  const neighbours = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let nextDist = 1;
  while (bfsStack.size > 0) {
    const next = new Set<string>();
    bfsStack.forEach((key) => {
      const [i, j] = key.split(",").map(Number);
      neighbours.forEach(([x, y]) => {
        const xi = i + x;
        const yj = j + y;
        if (op[xi]?.[yj] > nextDist) {
          op[xi][yj] = nextDist;
          next.add(getKey(xi, yj));
        }
      });
    });
    bfsStack = next;
    nextDist++;
  }
  return op;
}
function updateMatrix_(mat: number[][]): number[][] {
  const op: number[][] = Array(mat.length)
    .fill(0)
    .map((_, i) =>
      Array(mat[0].length)
        .fill(0)
        .map((_, j) => (mat[i][j] == 1 ? Number.MAX_SAFE_INTEGER : 0))
    );
  const neighbours = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const BFSTilloptimal = (i: number, j: number) => {
    const nextIter = [];
    neighbours.forEach(([x, y]) => {
      const xi = i + x;
      const yj = j + y;

      if (op[xi]?.[yj] > op[i][j] + 1) {
        op[xi][yj] = op[i][j] + 1;
        nextIter.push([xi, yj]);
      }
    });
    nextIter.forEach(([x, y]) => BFSTilloptimal(x, y));
  };

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] == 0) {
        BFSTilloptimal(i, j);
      }
    }
  }
  return op;
}
console.log(
  updateMatrix([
    [0, 0, 0],
    [1, 1, 1],
  ])
);
