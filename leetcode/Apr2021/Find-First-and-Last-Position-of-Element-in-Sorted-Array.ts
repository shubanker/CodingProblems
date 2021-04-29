/**
Find First and Last Position of Element in Sorted Array
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
nums is a non-decreasing array.
-10^9 <= target <= 10^9
 */
function searchRange(nums: number[], target: number): number[] {
  let start = 0,
    end = nums.length - 1,
    mid: number;
  const op = [-1, -1];
  while (start <= end) {
    mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) {
      op[0] = op[1] = mid;
      break;
    }
    if (nums[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  if (op[0] == -1) {
    return op;
  }
  if (op[0] != -1) {
    let updated = false;
    do {
      updated = false;
      if (nums[op[0] - 1] === target) {
        op[0]--;
        updated = true;
      }
      if (nums[op[1] + 1] === target) {
        op[1]++;
        updated = true;
      }
    } while (updated);
  }
  return op;
}
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
