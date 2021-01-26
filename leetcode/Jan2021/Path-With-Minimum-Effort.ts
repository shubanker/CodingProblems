/**
Path With Minimum Effort
You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

 

Example 1:



Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
Example 2:



Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
Example 3:


Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.
 

Constraints:

rows == heights.length
columns == heights[i].length
1 <= rows, columns <= 100
1 <= heights[i][j] <= 106
 */

const possibleNeighbours = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const pathCache = new Map<string, number>();
let minEffort: number;
function minimumEffortPath(heights: number[][]): number {
  minEffort = Infinity;
  pathCache.clear();
  minEffortForPath(heights, 0, 0, 0);
  return minEffort === Infinity ? 0 : minEffort;
}
const minEffortForPath = (heights: number[][], i: number, j: number, effort: number) => {
  possibleNeighbours.forEach((neighbour) => {
    const ii = neighbour[0] + i;
    const jj = neighbour[1] + j;

    //Alternative to check if ii,jj is within array bound
    if (heights[ii]?.[jj] !== undefined) {
      const newEf = Math.max(effort, Math.abs(heights[i][j] - heights[ii][jj]));
      const index = `${ii},${jj}`;

      //Continue only if we have lesser effort in hand.
      if ((pathCache.get(index) ?? Infinity) > newEf) {
        pathCache.set(index, newEf);
        if (ii === heights.length - 1 && jj === heights[0].length - 1) {
          minEffort = Math.min(minEffort, newEf);
        } else if (newEf < minEffort) {
          minEffortForPath(heights, ii, jj, newEf);
        }
      } else if (!pathCache.has(index)) {
        pathCache.set(index, newEf);
      }
    }
  });
};

console.log(minimumEffortPath([[3]]));
