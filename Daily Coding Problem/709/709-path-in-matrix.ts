/**
You are given an N by M matrix of 0s and 1s. Starting from the top left corner, how many ways are there to reach the bottom right corner?

You can only move right and down. 0 represents an empty space while 1 represents a wall you cannot walk through.

For example, given the following matrix:

[[0, 0, 1],
 [0, 0, 1],
 [1, 0, 0]]
Return two, as there are only two ways to get to the bottom right:

Right, down, down, right
Down, right, down, right
The top left corner and bottom right corner will always be 0.
 */
const findPaths = (matrix: number[][]) => {
  return finaAllPaths(matrix, 0, 0).map((p) => p.trim().split(" "));
};
const finaAllPaths = (matrix: number[][], i: number, j: number): string[] => {
  const verticleLength = matrix.length,
    horizontalLength = matrix[0].length;
  if (i == verticleLength - 1 && j == horizontalLength - 1) {
    return [""];
  }
  const nextPaths = [];
  const addPath = (path: string[], direction: string) => {
    if (Array.isArray(path)) {
      path.forEach((p) => {
        nextPaths.push(`${direction} ${p}`);
      });
    }
  };
  if (i < verticleLength - 1 && !matrix[i + 1][j]) {
    addPath(finaAllPaths(matrix, i + 1, j), "down");
  }
  if (j < horizontalLength - 1 && !matrix[i][j + 1]) {
    addPath(finaAllPaths(matrix, i, j + 1), "right");
  }
  return nextPaths;
};

//Tests
console.log(
  findPaths([
    [0, 0, 1],
    [0, 0, 1],
    [1, 0, 0],
  ])
);
