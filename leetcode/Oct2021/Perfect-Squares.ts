/**
Perfect Squares
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

 

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
 

Constraints:

1 <= n <= 104
 */
function numSquares(n: number): number {
  /*
    Approach: its like calculating the minimum number of coins to make an amount
    We check all the available options which are less than or equal to n and check which give the optimal answer
    We use cache also, to reduce calculating answer multiple times for one number 
    */
  let cache = [];
  return backtrack(n);
  function backtrack(n) {
    if (cache[n] !== undefined) {
      return cache[n];
    }
    if (n === 0) {
      //Base case. If the number as become 0 then 0 is the answer
      return 0;
    } else if (n === 1) {
      //If the remaining number is 1 than the anser is also 1
      return 1;
    }
    let min = Number.MAX_SAFE_INTEGER,
      res;
    for (let i = 1; i * i <= n; i++) {
      res = backtrack(n - i * i) + 1;
      min = Math.min(min, res);
    }
    cache[n] = min;
    return min;
  }
}
