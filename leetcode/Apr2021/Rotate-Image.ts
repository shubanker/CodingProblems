/**
Rotate Image
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Example 2:


Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
Example 3:

Input: matrix = [[1]]
Output: [[1]]
Example 4:

Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]
 */
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  let right = matrix.length,
    level = right / 2;
  while (level-- > 0) {
    let left = matrix.length - right;
    for (let i = left, ii = 0; i < right - 1; i++, ii++) {
      // swapping values clock wise
      let previousVal = matrix[left][i];
      matrix[left][i] = matrix[right - 1 - ii][left];
      matrix[right - 1 - ii][left] = matrix[right - 1][right - 1 - ii];
      matrix[right - 1][right - 1 - ii] = matrix[i][right - 1];
      matrix[i][right - 1] = previousVal;
    }
    right--;
  }
}
rotate([
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
]);
rotate([
  [4, 8],
  [3, 6],
]);
