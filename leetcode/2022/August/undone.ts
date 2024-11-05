/**
Kth Smallest Element in a Sorted Matrix
Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

You must find a solution with a memory complexity better than O(n2).

 

Example 1:

Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13
Example 2:

Input: matrix = [[-5]], k = 1
Output: -5
 

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 300
-109 <= matrix[i][j] <= 109
All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
1 <= k <= n2
 

Follow up:

Could you solve the problem with a constant memory (i.e., O(1) memory complexity)?
Could you solve the problem in O(n) time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.
 */
function mergedArrays(ar1: number[], ar2: number[], target: number[]) {
  let i = 0,
    j = 0;
  target.length = 0;
  while (i < ar1.length && j < ar2.length) {
    if (ar1[i] < ar2[i]) {
      target.push(ar1[i++]);
    } else {
      target.push(ar2[j++]);
    }
  }
  while (i < ar1.length) {
    target.push(ar1[i++]);
  }
  while (j < ar2.length) {
    target.push(ar2[j++]);
  }
}
function kthSmallest_(matrix: number[][], k: number): number {
  const tempArray = [];
  let i = 0;
  while (k >= tempArray.length) {
    mergedArrays(matrix[i], matrix[i + 1], tempArray);
    k -= tempArray.length;
    i += 2;
  }
  return tempArray[k];
}
function kthSmallest(matrix: number[][], k: number): number {
  let sqroot = Math.sqrt(k);
  let n = Math.floor(sqroot);
  // kth number lies in the corner.
  if (sqroot === n) {
    return matrix[n - 1][n - 1];
  }
  k -= n ** 2;
  let col = 0,
    row = 0;
  while (k > 1) {
    k--;
    if (matrix[row][n] < matrix[n][col]) {
      row++;
    } else {
      col++;
    }
  }
  return Math.min(matrix[row][n], matrix[n][col]);
}
console.log(
  kthSmallest(
    [
      [1, 3, 5],
      [6, 7, 12],
      [11, 14, 14],
    ],
    3
  )
);
// console.log(
//   kthSmallest(
//     [
//       [1, 5, 9],
//       [10, 11, 13],
//       [12, 13, 15],
//     ],
//     6
//   )
// );
// console.log(kthSmallest([[-5]], 1));
