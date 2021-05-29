/**
N-Queens II

Solution
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

 

Example 1:


Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 9
 */
function totalNQueens(n: number): number {
  let result = 0;

  const hasDiagonalConflict = (r: number, col: number, n: number, placed: number[]) => {
    for (let placedRow = 0; placedRow < n; placedRow++) {
      const placedCol = placed[placedRow];
      if (Math.abs(placedRow - r) === Math.abs(placedCol - col)) {
        return true;
      }
    }
    return false;
  };
  const backtrack = (r: number, placed: number[]) => {
    if (r === n) {
      result++;

      return;
    }
    for (let col = 0; col < n; col++) {
      if (!placed.includes(col) && !hasDiagonalConflict(r, col, n, placed)) {
        placed.push(col);
        backtrack(r + 1, placed);
        placed.pop();
      }
    }
  };

  for (let col = 0; col < n; col++) {
    backtrack(1, [col]);
  }

  return result;
}
