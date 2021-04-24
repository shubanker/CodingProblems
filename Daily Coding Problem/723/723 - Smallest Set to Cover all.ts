/**
Given a set of closed intervals, find the smallest set of numbers that covers all the intervals. If there are multiple smallest sets, return any of them.

For example, given the intervals [0, 3], [2, 6], [3, 4], [6, 9], one set of numbers that covers all these intervals is {3, 6}.

 */

function getInterval(intervals: number[][]) {
  let maxBase = Infinity,
    minUpper = -Infinity;
  intervals.forEach((interval) => {
    maxBase = Math.min(maxBase, interval[1]);
    minUpper = Math.max(minUpper, interval[0]);
  });
  let base = -Infinity;
  let upper = Infinity;

  intervals.forEach((interval) => {
    if (interval[0] <= maxBase && base < interval[0]) {
      base = interval[0];
    }
    if (interval[1] >= minUpper && upper > interval[1]) {
      upper = interval[1];
    }
  });
  return [base, upper];
}

//Tests
console.log(
  getInterval([
    [0, 3],
    [2, 6],
    [2, 4],
    [6, 9],
    [9, 14],
    [12, 16],
  ])
);
