/**
 * https://leetcode.com/explore/challenge/card/november-leetcoding-challenge/565/week-2-november-8th-november-14th/3526/
Given a binary matrix A, we want to flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed.  For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [0, 1, 1] results in [1, 0, 0].

Example 1:

Input: [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
Example 2:

Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Notes:

1 <= A.length = A[0].length <= 20
0 <= A[i][j] <= 1
 */

function flipAndInvertImage(A: number[][]): number[][] {
  A.forEach((row) => {
    const length = row.length;
    for (let index = 0; index < length / 2; index++) {
      if (index * 2 === length - 1) {
        row[index] = +!row[index];
      } else {
        const tem = +!row[index];
        row[index] = +!row[length - index - 1];
        row[length - index - 1] = tem;
      }
    }
  });
  return A;
}

//Tests.
console.log(
  flipAndInvertImage([
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
  ])
);
const reversed = flipAndInvertImage([
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 0, 1, 0],
]);
console.log(reversed);
console.log(flipAndInvertImage(reversed));
