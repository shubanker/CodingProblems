import { start } from "repl";

/**
Shortest Unsorted Continuous Subarray
Given an integer array nums, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.

Return the shortest such subarray and output its length.

 

Example 1:

Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Example 2:

Input: nums = [1,2,3,4]
Output: 0
Example 3:

Input: nums = [1]
Output: 0
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
 

Follow up: Can you solve it in O(n) time complexity?
 */
function findUnsortedSubarray(nums: number[]): number {
  //Finding point till array is decending
  let start = 0;
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[start] > nums[i]) {
      break;
    }
    start = i;
  }
  //Finding point till array is decending from back
  let end = nums.length - 1;
  for (let i = end - 1; i > start; i--) {
    if (nums[end] < nums[i]) {
      break;
    }
    end = i;
  }

  //geting minimum and maximum from the left subArray
  let min = start;
  let max = start;
  for (let i = start; i <= end; i++) {
    if (nums[i] < nums[min]) {
      min = i;
    }
    if (nums[i] > nums[max]) {
      max = i;
    }
  }

  //expandind subArray so it includes in the sortable subArray
  while (nums[start] > nums[min]) {
    start--;
  }
  while (nums[end] < nums[max]) {
    end++;
  }

  let len = end - start;
  len && len--;
  return len;
}
