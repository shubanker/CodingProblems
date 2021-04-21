/**
Triangle
Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

 

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
Example 2:

Input: triangle = [[-10]]
Output: -10
 

Constraints:

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 

Follow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?
 */

//DP.
function minimumTotal(triangle: number[][]): number {
  for (let i = triangle.length - 1; i > 0; i--) {
    for (let j = triangle[i].length - 2; j >= 0; j--) {
      triangle[i - 1][j] += Math.min(triangle[i][j], triangle[i][j + 1]);
    }
  }
  return triangle[0][0];
}

//DFS
let bestCount: number;
function minimumTotal_DFS(triangle: number[][]): number {
  bestCount = Number.MAX_SAFE_INTEGER;
  minimumTotalDFS(triangle, 0, 0, 0);
  return bestCount;
}
const minimumTotalDFS = (triangle: number[][], i: number, j: number, count: number) => {
  if (i >= triangle.length) {
    bestCount = Math.min(bestCount, count);
    return;
  }
  minimumTotalDFS(triangle, i + 1, j, count + triangle[i][j]);
  minimumTotalDFS(triangle, i + 1, j + 1, count + triangle[i][j]);
};

console.log(minimumTotal([[-1], [-2, -3]]));
