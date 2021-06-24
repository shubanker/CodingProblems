/**
Out of Boundary Paths
There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent four cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.

 

Example 1:


Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
Example 2:


Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
Output: 12
 

Constraints:

1 <= m, n <= 50
0 <= maxMove <= 50
0 <= startRow <= m
0 <= startColumn <= n
 */
{
  const findPaths = (m: number, n: number, maxMove: number, startRow: number, startColumn: number): number => {
    const neighbours = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    const memo = new Map<string, number>();
    const mod = 10 ** 9 + 7;
    const DFS = (i: number, j: number, move: number) => {
      if (i < 0 || j < 0 || i == m || j == n) {
        return 1;
      }
      if (move == 0) {
        return 0;
      }
      const key = `${i}-${j}-${move}`;
      if (!memo.has(key)) {
        let sum = 0;
        neighbours.forEach(([x, y]) => {
          sum += DFS(x + i, y + j, move - 1);
          sum %= mod;
        });
        memo.set(key, sum);
      }
      return memo.get(key);
    };
    return DFS(startRow, startColumn, maxMove);
  };
}
