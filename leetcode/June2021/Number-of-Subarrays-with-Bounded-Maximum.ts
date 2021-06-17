/**
Number of Subarrays with Bounded Maximum
We are given an array nums of positive integers, and two positive integers left and right (left <= right).

Return the number of (contiguous, non-empty) subarrays such that the value of the maximum array element in that subarray is at least left and at most right.

Example:
Input: 
nums = [2, 1, 4, 3]
left = 2
right = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
Note:

left, right, and nums[i] will be an integer in the range [0, 109].
The length of nums will be in the range of [1, 50000].
 */
function numSubarrayBoundedMax(nums: number[], left: number, right: number): number {
  let i = 0,
    j = 0,
    counter = 0;
  let contiguous = 0;
  while (i < nums.length && j < nums.length) {
    if (nums[j] >= left && nums[j] <= right) {
      contiguous = j - i + 1;
    } else if (nums[j] > right) {
      contiguous = 0;
      i = j + 1;
    }
    counter += contiguous;
    j++;
  }
  return counter;
}
console.log(numSubarrayBoundedMax([2, 1, 4, 3], 2, 3));
