/**
Smallest Range II
Given an array A of integers, for each integer A[i] we need to choose either x = -K or x = K, and add x to A[i] (only once).

After this process, we have some array B.

Return the smallest possible difference between the maximum value of B and the minimum value of B.

 

Example 1:

Input: A = [1], K = 0
Output: 0
Explanation: B = [1]
Example 2:

Input: A = [0,10], K = 2
Output: 6
Explanation: B = [2,8]
Example 3:

Input: A = [1,3,6], K = 3
Output: 3
Explanation: B = [4,6,3]
 

Note:

1 <= A.length <= 10000
0 <= A[i] <= 10000
0 <= K <= 10000
 */
function smallestRangeII(A: number[], K: number): number {
  A.sort((a, b) => a - b);
  let lowest = A[0];
  let highest = A[A.length - 1];
  let result = highest - lowest;
  for (let index = 0; index < A.length - 1; index++) {
    const max = Math.min(lowest + K, A[index + 1] - K);
    const min = Math.max(highest - K, A[index] + K);
    console.log(max, min);
    result = Math.min(result, Math.abs(max - min));
  }
  return result;
}
console.log(smallestRangeII([1, 3, 6], 3));
