/**
Find Minimum in Rotated Sorted Array II
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,4,4,5,6,7] might become:

[4,5,6,7,0,1,4] if it was rotated 4 times.
[0,1,4,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.

You must decrease the overall operation steps as much as possible.

 

Example 1:

Input: nums = [1,3,5]
Output: 1
Example 2:

Input: nums = [2,2,2,0,1]
Output: 0
 

Constraints:

n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
nums is sorted and rotated between 1 and n times.
 

Follow up: This problem is similar to Find Minimum in Rotated Sorted Array, but nums may contain duplicates. Would this affect the runtime complexity? How and why?
 */

const findIndex = (nums: number[], fn: (val: number, index: number) => number): number => {
  let lo = 0,
    hi = nums.length - 1;

  while (lo <= hi) {
    const mi = Math.floor((lo + hi) / 2);

    if (fn(nums[mi], mi) === 0) return mi;
    if (fn(nums[mi], mi) < 0) lo = mi + 1;
    else hi = mi - 1;
  }
  return lo - 1;
};

function findMin(nums: number[]): number {
  const first = nums[0];
  while (nums.length !== 0 && nums[0] === nums[nums.length - 1]) {
    nums.pop();
  }
  if (nums.length === 0) return first;

  const maxIdx = findIndex(nums, (val) => (val >= nums[0] ? -1 : 1));

  return nums[(maxIdx + 1) % nums.length];
}
function findMin_(nums: number[]): number {
  return Math.min(...nums);
}
