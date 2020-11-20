/**
Search in Rotated Sorted Array II

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,0,1,2,2,5,6] might become [2,5,6,0,0,1,2]).

You are given a target value to search. If found in the array return true, otherwise return false.

Example 1:

Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
Example 2:

Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
Follow up:

This is a follow up problem to Search in Rotated Sorted Array, where nums may contain duplicates.
Would this affect the run-time complexity? How and why?

 */

function search(nums: number[], target: number): boolean {
  let breakpoint = 0;
  for (let index = 1; index < nums.length; index++) {
    if (nums[index - 1] > nums[index]) {
      breakpoint = index;
      break;
    }
  }
  nums = nums.slice(breakpoint).concat(nums.slice(0, breakpoint));
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) {
      return true;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return false;
}

//Tests.
const array = [2, 5, 6, 0, 0, 1, 2];
array.forEach((a) => {
  console.log(search(array, a));
});
