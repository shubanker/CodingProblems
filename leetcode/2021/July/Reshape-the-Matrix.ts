/**
Reshape the Matrix
In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the row number and column number of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.

 

Example 1:


Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
Example 2:


Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 100
-1000 <= mat[i][j] <= 1000
1 <= r, c <= 300
 */
function matrixReshape(mat: number[][], r: number, c: number): number[][] {
  if (mat[0].length * mat.length !== r * c) {
    return mat;
  }
  const getIndex = (i: number, j: number) => {
    const elemPosition = i * mat[0].length + j;
    const x = Math.floor(elemPosition / c);
    const y = elemPosition % c;
    return [x, y];
  };
  const ar: number[][] = Array(r)
    .fill(null)
    .map(() => Array(c));
  mat.forEach((row, i) => {
    row.forEach((val, j) => {
      const [x, y] = getIndex(i, j);
      ar[x][y] = val;
    });
  });
  return ar;
}
console.log(
  matrixReshape(
    [
      [1, 2],
      [3, 4],
    ],
    1,
    4
  )
);
