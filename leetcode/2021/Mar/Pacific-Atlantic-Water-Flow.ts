/**
Pacific Atlantic Water Flow
Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, 
the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) 
from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:

The order of returned grid coordinates does not matter.
Both m and n are less than 150.
 

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
(positions with parentheses in above matrix).
 */

import { runTests } from "../../test";

{
  function pacificAtlantic(matrix: number[][]): number[][] {
    let pacificStack: string[] = [];
    let atlanticStack: string[] = [];
    for (let i = 0; i < matrix.length; i++) {
      pacificStack.push(`${i},0`);
      atlanticStack.push(`${i},${matrix[0].length - 1}`);
    }
    for (let i = 0; i < matrix[0]?.length; i++) {
      pacificStack.push(`0,${i}`);
      atlanticStack.push(`${matrix.length - 1},${i}`);
    }
    const pacific = new Set<string>(pacificStack);
    const atlantic = new Set<string>(atlanticStack);
    findUntil(matrix, pacificStack, pacific);
    findUntil(matrix, atlanticStack, atlantic);
    const op: number[][] = [];
    for (const p of pacific) {
      if (atlantic.has(p)) {
        op.push(p.split(",").map(Number));
      }
    }
    return op;
  }
  const neighbours = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const findUntil = (matrix: number[][], stack: string[], marked: Set<string>) => {
    while (stack.length) {
      const nextStack: string[] = [];
      try {
        stack.forEach((position) => {
          const [x, y] = position.split(",").map(Number);
          neighbours.forEach((cord) => {
            const neigx = x + cord[0];
            const neigy = y + cord[1];
            if (matrix[x][y] <= (matrix[neigx]?.[neigy] ?? -Infinity)) {
              const neighbourKey = `${neigx},${neigy}`;
              if (!marked.has(neighbourKey)) {
                marked.add(neighbourKey);
                nextStack.push(neighbourKey);
              }
            }
          });
        });
      } catch {
        console.log("wtf");
      }
      stack = nextStack;
    }
  };
  console.log(
    runTests(
      [
        {
          arguments: [
            [
              [3, 3, 3, 3, 3, 3],
              [3, 0, 3, 3, 0, 3],
              [3, 3, 3, 3, 3, 3],
            ],
          ],
          output: [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
            [0, 5],
            [1, 0],
            [1, 2],
            [1, 3],
            [1, 5],
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [2, 4],
            [2, 5],
          ],
        },
        {
          arguments: [
            [
              [3, 3, 3],
              [3, 1, 3],
              [0, 2, 4],
            ],
          ],
          output: [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2],
          ],
        },
        {
          arguments: [
            [
              [1, 2, 2, 3, 5],
              [3, 2, 3, 4, 4],
              [2, 4, 5, 3, 1],
              [6, 7, 1, 4, 5],
              [5, 1, 1, 2, 4],
            ],
          ],
          output: [
            [0, 4],
            [1, 3],
            [1, 4],
            [2, 2],
            [3, 0],
            [3, 1],
            [4, 0],
          ],
        },
        {
          arguments: [[]],
          output: [],
        },
      ],
      pacificAtlantic,
      (a: number[][], b: number[][]) => {
        if (a?.length !== b?.length) {
          return false;
        }
        const seta = new Set(a.map((i) => i.join(",")));
        b.forEach((cord) => {
          seta.delete(cord?.join(","));
        });
        return seta.size === 0;
      }
    )
  );
}
