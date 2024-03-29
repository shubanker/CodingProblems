/**
Partition Array into Disjoint Intervals

Given an array nums, partition it into two (contiguous) subarrays left and right so that:

Every element in left is less than or equal to every element in right.
left and right are non-empty.
left has the smallest possible size.
Return the length of left after such a partitioning.  It is guaranteed that such a partitioning exists.

 

Example 1:

Input: nums = [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]
Example 2:

Input: nums = [1,1,1,0,6,12]
Output: 4
Explanation: left = [1,1,1,0], right = [6,12]
 

Note:

2 <= nums.length <= 30000
0 <= nums[i] <= 10^6
It is guaranteed there is at least one way to partition nums as described.
 */
function partitionDisjoint(nums: number[]): number {
  let lMax = nums[0],
    index = 0,
    max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (lMax > nums[i]) {
      lMax = max;
      index = i;
    } else {
      max = Math.max(max, nums[i]);
    }
  }
  return index + 1;
}
