/**
Valid Sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
 */
{
  const isValidSudoku = (board: string[][]): boolean => {
    const rowIndex = Array(9)
      .fill(0)
      .map(() => new Set<string>());
    const colIndex = Array(9)
      .fill(0)
      .map(() => new Set<string>());
    const subBlockIndex = Array(9)
      .fill(0)
      .map(() => new Set<string>());
    const getBlockNo = (i: number, j: number) => {
      const height = Math.floor(i / 3);
      const width = Math.floor(j / 3);
      return 3 * height + width;
    };
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const num = board[i][j];
        if (num !== ".") {
          if (rowIndex[i].has(num) || colIndex[j].has(num) || subBlockIndex[getBlockNo(i, j)].has(num)) {
            return false;
          }
          rowIndex[i].add(num);
          colIndex[j].add(num);
          subBlockIndex[getBlockNo(i, j)].add(num);
        }
      }
    }

    return true;
  };
}
