/**
Diagonal Traverse
https://leetcode.com/problems/diagonal-traverse/
Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.

Example:

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

Output:  [1,2,4,7,5,3,6,8,9]

Explanation:

 

Note:

The total number of elements of the given matrix will not exceed 10,000.
 */

function findDiagonalOrder(matrix: number[][]): number[] {
  const nums: number[] = [];
  let i = 0,
    j = 0;
  let moveUp = true;
  while (i < matrix.length && j < matrix[0].length) {
    nums.push(matrix[i][j]);
    if ((i === 0 || j === matrix[0].length - 1) && moveUp) {
      moveUp = false;
      if (j < matrix[0].length - 1) {
        j++;
      } else {
        i++;
      }
      continue;
    } else if ((i === matrix.length - 1 || j === 0) && !moveUp) {
      moveUp = true;
      if (i < matrix.length - 1) {
        i++;
      } else {
        j++;
      }
      continue;
    }
    if (moveUp) {
      j++;
      i--;
    } else {
      i++;
      j--;
    }
  }
  return nums;
}
console.log(
  findDiagonalOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
console.log(
  findDiagonalOrder([
    [1, 2, 3, 10],
    [4, 5, 6, 11],
    [7, 8, 9, 12],
  ])
);
console.log(findDiagonalOrder([[1]]));
