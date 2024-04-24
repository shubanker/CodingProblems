import { runTests } from "../../../test";

/**
33. Search in Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104
 */
function search(nums: number[], target: number): number {
  let breakpoint = 0;
  const getActualIndex = (index: number) => (index + breakpoint + 1) % nums.length;
  while (nums[breakpoint] !== undefined && nums[breakpoint] <= nums[breakpoint + 1]) {
    breakpoint++;
  }

  let head = 0,
    tail = nums.length - 1,
    mid: number;
  do {
    mid = head + Math.floor((tail - head) / 2);
    const actualIndex = getActualIndex(mid);
    if (nums[actualIndex] === target) {
      return actualIndex;
    }
    if (nums[actualIndex] < target) {
      head = mid + 1;
    } else {
      tail = mid - 1;
    }
  } while (head <= tail);
  return -1;
}

// Tests
console.log(
  runTests(
    [
      [4, 5, 6, 7, 0, 1, 2],
      [0, 1, 2, 4, 5, 6, 7],
    ]
      .map((ar) => ar.map((el, i, ar) => ({ arguments: [ar, el], output: i })))
      .flat(),
    search
  )
);

// [4,5,6,7,0,1,2]
// [0,1,2,4,5,6,7]

// breakpoint = 3
// 0=>3 (i+breakpoint)
// 1=>4

// 3=>6
// 4=>0 => i-(breakpoint+1)
