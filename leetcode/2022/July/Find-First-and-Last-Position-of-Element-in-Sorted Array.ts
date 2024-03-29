/**
Find First and Last Position of Element in Sorted Array
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

 

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
function searchRange_(nums: number[], target: number): number[] {
  const pos = [-1, -1];
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      pos[0] = pos[1] = mid;
      break;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  while (true) {
    let canContinue = false;
    if (nums[pos[0] - 1] === target) {
      pos[0]--;
      canContinue = true;
    }
    if (nums[pos[1] + 1] === target) {
      pos[1]++;
      canContinue = true;
    }
    if (!canContinue) {
      break;
    }
  }
  return pos;
}
// True O(log n) sol
function searchRange(nums: number[], target: number): number[] {
  let left: number = 0;
  let right: number = nums.length - 1;

  const range: number[] = [-1, -1];
  while (left <= right) {
    const middle: number = Math.floor(left + (right - left) / 2);

    if (target === nums[middle]) {
      if ((nums[middle - 1] ?? -Infinity) !== target) range[0] = middle;
      else range[0] = binaryHelper(nums, left, middle - 1, target, "left");

      if ((nums[middle + 1] ?? Infinity) !== target) range[1] = middle;
      else range[1] = binaryHelper(nums, middle + 1, right, target, "right");
      return range;
    }
    if (target < nums[middle]) right = middle - 1;
    else left = middle + 1;
  }

  return range;
}

function binaryHelper(nums: number[], left: number, right: number, target: number, edge: "left" | "right"): number {
  while (left <= right) {
    const middle: number = Math.floor(left + (right - left) / 2);

    if (target === nums[middle]) {
      if (edge === "left") {
        if ((nums[middle - 1] ?? Infinity) !== target) return middle;
        else right = middle - 1;
      }
      if (edge === "right") {
        if ((nums[middle + 1] ?? -Infinity) !== target) return middle;
        else left = middle + 1;
      }
    } else if (target < nums[middle]) right = middle - 1;
    else left = middle + 1;
  }

  return -1;
}
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
