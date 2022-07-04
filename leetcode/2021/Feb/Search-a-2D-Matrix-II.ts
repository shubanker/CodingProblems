import { runTests } from "../../test";

/**
Search a 2D Matrix II
Write an efficient algorithm that searches for a target value in an m x n integer matrix. The matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
 

Example 1:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
Example 2:


Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-109 <= matix[i][j] <= 109
All the integers in each row are sorted in ascending order.
All the integers in each column are sorted in ascending order.
-109 <= target <= 109
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  let x = 0,
    y = matrix[0].length - 1;

  while (x < matrix.length && y >= 0) {
    if (matrix[x][y] === target) {
      return true;
    } else if (matrix[x][y] < target) {
      x++;
    } else {
      y--;
    }
  }

  return false;
}
function searchMatrix_overComplicated(matrix: number[][], target: number): boolean {
  return searchInMatrix(matrix, target, {
    rStart: 0,
    rEnd: matrix.length - 1,
    cStart: 0,
    cEnd: matrix[0].length,
  });
}
const searchInMatrix = (matrix: number[][], target: number, slice: sliceMatric) => {
  let { rStart, cStart, rEnd, cEnd } = slice;
  if (rStart > rEnd || cStart > cEnd) {
    return matrix[rStart]?.[cStart] === target;
  }
  const rmid = rStart + Math.floor((rEnd - rStart) / 2);
  const cmid = cStart + Math.floor((cEnd - cStart) / 2);
  if (matrix[rmid]?.[cmid] === target) {
    return true;
  }
  if (matrix[rmid]?.[cmid] < target) {
    return (
      (rStart !== rmid + 1 &&
        searchInMatrix(matrix, target, {
          rStart: rmid + 1,
          rEnd,
          cStart,
          cEnd,
        })) ||
      ((rEnd !== rmid || cStart !== cmid) &&
        searchInMatrix(matrix, target, {
          rStart,
          rEnd: rmid,
          cStart: cmid,
          cEnd,
        }))
    );
  } else {
    return (
      (rEnd !== rmid - 1 &&
        searchInMatrix(matrix, target, {
          rStart,
          rEnd: rmid - 1,
          cStart,
          cEnd,
        })) ||
      ((rStart !== rmid || cEnd !== cmid) &&
        searchInMatrix(matrix, target, {
          rStart: rmid,
          rEnd,
          cStart,
          cEnd: cmid,
        }))
    );
  }
};
interface sliceMatric {
  rStart: number;
  cStart: number;
  rEnd: number;
  cEnd: number;
}
function searchMatrix_1(matrix: number[][], target: number): boolean {
  let rmin = 0,
    rmax = matrix.length - 1;
  let cmin = 0,
    cmax = matrix[0].length - 1;
  let rmid: number = -1,
    cmid: number = -1;
  while (rmin <= rmax || cmin <= cmax) {
    if (rmin <= rmax) {
      rmid = rmin + Math.floor((rmax - rmin) / 2);
    }
    if (cmin <= cmax) {
      cmid = cmin + Math.floor((cmax - cmin) / 2);
    }
    if (matrix[rmid][cmid] === target) {
      return true;
    }
    if (matrix[rmid][cmid] < target) {
      if (rmin === rmid && cmin === cmid) {
        break;
      }
      rmin = rmid;
      cmin = cmid;
    } else {
      if (rmax == rmid && cmax == cmid) {
        break;
      }
      rmax = rmid;
      cmax = cmid;
    }
  }
  for (let i = rmin; i <= rmax; i++) {
    for (let j = cmin; j <= cmax; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }
  return false;
}
console.log(
  runTests(
    [
      {
        arguments: [
          [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30],
          ],
          20,
        ],
        output: false,
      },
      {
        arguments: [
          [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
          ],
          15,
        ],
        output: true,
      },
      {
        arguments: [
          [
            [1, 4],
            [2, 5],
          ],
          2,
        ],
        output: true,
      },
      {
        arguments: [
          [
            [1, 4, 7, 11, 15],
            [2, 5, 8, 12, 19],
            [3, 6, 9, 16, 22],
            [10, 13, 14, 17, 24],
            [18, 21, 23, 26, 30],
          ],
          5,
        ],
        output: true,
      },
    ],
    searchMatrix
  )
);
