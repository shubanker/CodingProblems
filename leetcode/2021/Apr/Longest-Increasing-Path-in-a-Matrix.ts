/**
Longest Increasing Path in a Matrix
Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 

Example 1:


Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
Example 2:


Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.
Example 3:

Input: matrix = [[1]]
Output: 1
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
0 <= matrix[i][j] <= 2^31 - 1
 */
const fourNeighbours = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];
let currentBest = 0;
function longestIncreasingPath(matrix: number[][]): number {
  currentBest = 0;
  const DP = Array(matrix.length)
    .fill(0)
    .map((c) =>
      Array(matrix[0].length)
        .fill(0)
        .map((v) => [])
    );

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fourNeighbours.forEach((neigh) => {
        const ni = i + neigh[0],
          nj = j + neigh[1];
        if (matrix[ni]?.[nj] !== undefined && matrix[ni][nj] > matrix[i][j]) {
          DP[i][j].push(getMemoKey(ni, nj));
        }
      });
    }
  }
  const memo = new Map();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      findMaxIncresingPath(DP, i, j, memo);
    }
  }
  return currentBest;
}
const getMemoKey = (i: number, j: number) => `${i},${j}`;
const findMaxIncresingPath = (pathDP: string[][][], i: number, j: number, memo: Map<string, number>) => {
  const memoKey = getMemoKey(i, j);
  if (!memo.has(memoKey)) {
    const incresingPaths = [1];
    pathDP[i][j].forEach((cord) => {
      const [ni, nj] = cord.split(",").map((c) => +c);
      incresingPaths.push(1 + findMaxIncresingPath(pathDP, ni, nj, memo));
    });
    memo.set(memoKey, Math.max(...incresingPaths));
    currentBest = Math.max(currentBest, memo.get(memoKey));
  }
  return memo.get(memoKey);
};
console.log(
  longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ])
);
