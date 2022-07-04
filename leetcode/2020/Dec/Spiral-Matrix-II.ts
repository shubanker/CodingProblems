/**
Spiral Matrix II
Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

 

Example 1:


Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 20
 */
const generateMatrix: (n: number) => number[][] = (n: number) => {
  const ar: number[][] = new Array(n).fill(void 0).map((s) => new Array(n).fill(-1));
  let maxHorizontal = n - 1;
  let minHorizontal = 0;
  let maxvertical = n - 1;
  let minvertical = 1;
  let direction = "right";
  let row = 0,
    column = 0;
  for (let i = 0; i < n * n; i++) {
    ar[row][column] = i + 1;
    if (direction == "right") {
      if (column !== maxHorizontal) {
        column++;
      } else {
        row++;
        direction = "down";
        maxHorizontal--;
      }
    } else if (direction == "down") {
      if (row !== maxvertical) {
        row++;
      } else {
        direction = "left";
        column--;
        maxvertical--;
      }
    } else if (direction == "left") {
      if (column !== minHorizontal) {
        column--;
      } else {
        direction = "up";
        minHorizontal++;
        row--;
      }
    } else if (direction == "up") {
      if (row !== minvertical) {
        row--;
      } else {
        direction = "right";
        column++;
        minvertical++;
      }
    }
  }
  return ar;
};
console.log(generateMatrix(7).map((d) => d.join(",")));
