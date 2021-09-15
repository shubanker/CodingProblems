/**
Longest Turbulent Subarray
Given an integer array arr, return the length of a maximum size turbulent subarray of arr.

A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray [arr[i], arr[i + 1], ..., arr[j]] of arr is said to be turbulent if and only if:

For i <= k < j:
arr[k] > arr[k + 1] when k is odd, and
arr[k] < arr[k + 1] when k is even.
Or, for i <= k < j:
arr[k] > arr[k + 1] when k is even, and
arr[k] < arr[k + 1] when k is odd.
 

Example 1:

Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
Explanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5]
Example 2:

Input: arr = [4,8,12,16]
Output: 2
Example 3:

Input: arr = [100]
Output: 1
 

Constraints:

1 <= arr.length <= 4 * 104
0 <= arr[i] <= 109
 */
function maxTurbulenceSize(arr: number[]): number {
  let oddTurb = 1; /* turbulent if A[k] < A[k+1] when k is even, and A[k] < A[k+1] when k is even */
  let evenTurb = 1; /* turbulent if A[k] > A[k+1] when k is even, and A[k] < A[k+1] when k is odd */
  let maxLen = 1;

  for (let k = 0; k < arr.length - 1; k++) {
    if (k % 2 == 1) {
      // when k is odd
      oddTurb = arr[k] > arr[k + 1] ? oddTurb + 1 : 1;
      evenTurb = arr[k] < arr[k + 1] ? evenTurb + 1 : 1;
    } else {
      // when k is even
      evenTurb = arr[k] > arr[k + 1] ? evenTurb + 1 : 1;
      oddTurb = arr[k] < arr[k + 1] ? oddTurb + 1 : 1;
    }

    maxLen = Math.max(maxLen, oddTurb, evenTurb);
  }

  return maxLen;
}
