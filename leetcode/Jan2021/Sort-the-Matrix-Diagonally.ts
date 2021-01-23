/**
Sort the Matrix Diagonally
A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].

Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.

 

Example 1:


Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 100
1 <= mat[i][j] <= 100
 */
function diagonalSort(mat: number[][]): number[][] {
  const height = mat.length;
  const len = mat[0]?.length;
  for (let index = 0; index < mat.length; index++) {
    sortDigonal(mat, index, 0);
  }
  for (let index = 1; index < len; index++) {
    sortDigonal(mat, 0, index);
  }
  return mat;
}
const sortDigonal = (mat: number[][], i: number, j: number) => {
  for (; i < mat.length; i++) {
    let minIndexHeight = i;
    for (let k = i + 1; k < mat.length; k++) {
      if (j + k - i >= mat[0].length) {
        break; //If right side ended
      }
      const breadth = j + k - i;
      if (mat[k][breadth] < mat[minIndexHeight][j + minIndexHeight - i]) {
        minIndexHeight = k;
      }
    }
    if (minIndexHeight != i) {
      const tem = mat[minIndexHeight][j + minIndexHeight - i];
      mat[minIndexHeight][j + minIndexHeight - i] = mat[i][j];
      mat[i][j] = tem;
    }
  }
};
console.log(
  diagonalSort([
    [3, 3, 1, 1],
    [2, 2, 1, 2],
    [1, 1, 1, 2],
  ])
);
