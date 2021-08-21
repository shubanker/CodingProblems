/**
Sudoku Solver
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

 

Example 1:


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:


 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.
 */
{
  interface SudokuBlock {
    row: number;
    col: number;
    subBlock: number;
    posibilities: Set<string>;
    blocked: boolean;
  }
  const solveSudoku = (board: string[][]): void => {
    const rowMap = new Map<number, SudokuBlock[]>();
    const colMap = new Map<number, SudokuBlock[]>();
    const subBlockMap = new Map<number, SudokuBlock[]>();
    const InsertInMap = (map: Map<number, SudokuBlock[]>, key: number, value: SudokuBlock) => {
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(value);
    };
    const possibleVals = Array(9)
      .fill(0)
      .map((_, i) => i + 1 + "");
    const emptyBlockAr: SudokuBlock[] = [];
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === ".") {
          const subBlock = getBlockNo(i, j);
          const block: SudokuBlock = {
            col: j,
            row: i,
            subBlock,
            posibilities: new Set(possibleVals),
            blocked: false,
          };
          InsertInMap(rowMap, i, block);
          InsertInMap(colMap, j, block);
          InsertInMap(subBlockMap, subBlock, block);
          emptyBlockAr.push(block);
        }
      });
    });
    //removing non possible vals.
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== ".") {
          const subBlock = getBlockNo(i, j);
          rowMap.get(i).forEach((set) => set.posibilities.delete(col));
          colMap.get(j).forEach((set) => set.posibilities.delete(col));
          subBlockMap.get(subBlock).forEach((set) => set.posibilities.delete(col));
        }
      });
    });

    if (backTrackSudoku(emptyBlockAr, 0, { subBlockMap, rowMap, colMap })) {
      emptyBlockAr.forEach(({ col, row, posibilities }) => {
        const [val] = [...posibilities];
        board[row][col] = val;
      });
    }
  };
  const backTrackSudoku = (
    blockAr: SudokuBlock[],
    position: number,
    maps: {
      rowMap: Map<number, SudokuBlock[]>;
      colMap: Map<number, SudokuBlock[]>;
      subBlockMap: Map<number, SudokuBlock[]>;
    }
  ) => {
    const { subBlock, row, col, posibilities } = blockAr[position];
    if (posibilities.size === 0) {
      return false;
    }
    if (position === blockAr.length - 1) {
      return posibilities.size === 1;
    }
    blockAr[position].blocked = true;
    for (const key of posibilities) {
      const deletedSet = new Set<SudokuBlock>();
      removeKeysifExist(key, maps.colMap.get(col), deletedSet);
      removeKeysifExist(key, maps.rowMap.get(row), deletedSet);
      removeKeysifExist(key, maps.subBlockMap.get(subBlock), deletedSet);
      if (backTrackSudoku(blockAr, position + 1, maps)) {
        blockAr[position].posibilities.clear();
        blockAr[position].posibilities.add(key);

        return true;
      }
      deletedSet.forEach((block) => block.posibilities.add(key));
    }
    blockAr[position].blocked = false;
  };
  const removeKeysifExist = (key: string, ar: SudokuBlock[], collectionSet: Set<SudokuBlock>) => {
    ar.forEach((block) => {
      if (!block.blocked && block.posibilities.has(key)) {
        collectionSet.add(block);
        block.posibilities.delete(key);
      }
    });
  };
  const getBlockNo = (i: number, j: number) => {
    const height = Math.floor(i / 3);
    const width = Math.floor(j / 3);
    return 3 * height + width;
  };

  solveSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ]);
}
