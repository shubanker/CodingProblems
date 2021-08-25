/**
Sum of Square Numbers
Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.

 

Example 1:

Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5
Example 2:

Input: c = 3
Output: false
Example 3:

Input: c = 4
Output: true
Example 4:

Input: c = 2
Output: true
Example 5:

Input: c = 1
Output: true
 

Constraints:

0 <= c <= 2^31 - 1
 */
const judgeSquareSumVals = new Set([0, 1]);
let checkedSqSumTill = 1;
function judgeSquareSum(c: number): boolean {
  for (let item of judgeSquareSumVals) {
    if (judgeSquareSumVals.has(c - item)) {
      return true;
    }
    if (item > c) {
      break;
    }
  }
  const sqLimit = Math.sqrt(c);
  for (checkedSqSumTill; checkedSqSumTill <= sqLimit; checkedSqSumTill++) {
    const sq = checkedSqSumTill * checkedSqSumTill;
    judgeSquareSumVals.add(sq);
    if (judgeSquareSumVals.has(c - sq)) {
      return true;
    }
  }
  return false;
}
console.log(judgeSquareSum(5));
console.log(judgeSquareSum(10));
console.log(judgeSquareSum(64));
console.log(judgeSquareSum(90));
