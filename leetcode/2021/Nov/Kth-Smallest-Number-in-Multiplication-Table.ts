/**
Kth Smallest Number in Multiplication Table
Nearly everyone has used the Multiplication Table. The multiplication table of size m x n is an integer matrix mat where mat[i][j] == i * j (1-indexed).

Given three integers m, n, and k, return the kth smallest element in the m x n multiplication table.

 

Example 1:


Input: m = 3, n = 3, k = 5
Output: 3
Explanation: The 5th smallest number is 3.
Example 2:


Input: m = 2, n = 3, k = 6
Output: 6
Explanation: The 6th smallest number is 6.
 

Constraints:

1 <= m, n <= 3 * 104
1 <= k <= m * n
 */

function findKthNumber(m: number, n: number, k: number): number {
  // lo always points to a value which is
  // not going to be our answer
  let lo = 0;
  let hi = m * n;

  // the loop stops when lo and hi point to two adjascent numbers
  // because lo is always incorrect, hi will contain our final answer
  while (lo + 1 < hi) {
    // As a general practice don't do a (lo + hi) / 2 because that
    // might cause integer overflow
    const mid = lo + Math.floor((hi - lo) / 2);
    const count = countLessThanEqual(mid, m, n);

    // Find the minimum mid, such that count >= k
    if (count >= k) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return hi;
}

function countLessThanEqual(target, rows, cols) {
  let count = 0;
  // we move row by row in the multiplication table
  // Each row contains at max (target / rowIndex) elements less than
  // or equal to target. The number of cols would limit it though.
  for (let i = 1; i <= rows; i++) {
    count += Math.min(Math.floor(target / i), cols);
  }
  return count;
}
