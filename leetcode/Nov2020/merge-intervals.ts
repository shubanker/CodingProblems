/**
Merge Intervals
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
 */
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });
  for (let index = 0; index < intervals.length - 1; index++) {
    let nextInterval = index + 1;
    while (nextInterval < intervals.length && intervals[index][1] >= intervals[nextInterval][0]) {
      intervals[index][1] = Math.max(intervals[nextInterval][1], intervals[index][1]);
      intervals[nextInterval++] = [];
    }
    index = nextInterval - 1;
  }
  return intervals.filter((a) => a.length);
}

//Test.
console.log(
  merge([
    [2, 3],
    [2, 2],
    [3, 3],
    [1, 3],
    [5, 7],
    [2, 2],
    [4, 6],
  ])
);
