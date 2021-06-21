/**
Pascal's Triangle
Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]
 

Constraints:

1 <= numRows <= 30
 */
const pascleMemo = [[1], [1, 1]];
function generate(numRows: number): number[][] {
  while (pascleMemo.length < numRows) {
    const last = pascleMemo[pascleMemo.length - 1];
    const next = [last[0]];
    for (let i = 1; i <= last.length; i++) {
      next.push(last[i - 1] + (last[i] ?? 0));
    }
    pascleMemo.push(next);
  }
  return pascleMemo.slice(0, numRows);
}
console.log(generate(5));
