/**
 * 
N-Queens

Solution
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 

Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
 

Constraints:

1 <= n <= 9
 */
function solveNQueens(n: number): string[][] {
  let result: string[][] = [];

  const rowString = (col: number) => `${".".repeat(col - 0)}Q${".".repeat(n - col - 1)}`;

  const backtrack = (r: number, placed: number[]) => {
    if (r === n) {
      result.push(placed.map((col) => rowString(col)));
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

const hasDiagonalConflict = (r: number, col: number, n: number, placed: number[]) => {
  for (let placedRow = 0; placedRow < n; placedRow++) {
    const placedCol = placed[placedRow];
    if (Math.abs(placedRow - r) === Math.abs(placedCol - col)) {
      return true;
    }
  }
  return false;
};
