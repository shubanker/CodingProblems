/**
4Sum
Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

 

Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
 

Constraints:

1 <= nums.length <= 200
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
*/

//Bad approach, can do better :(
function fourSum(nums: number[], target: number): number[][] {
  const op: number[][] = [];
  const set = new Set<string>();
  for (let i = 0; i < nums.length - 3; i++) {
    for (let j = i + 1; j < nums.length - 2; j++) {
      for (let k = j + 1; k < nums.length - 1; k++) {
        for (let l = k + 1; l < nums.length; l++) {
          if (nums[i] + nums[j] + nums[k] + nums[l] === target) {
            const key = [nums[i], nums[j], nums[k], nums[l]].sort((a, b) => a - b).join(",");
            if (!set.has(key)) {
              op.push([nums[i], nums[j], nums[k], nums[l]]);
              set.add(key);
            }
          }
        }
      }
    }
  }
  return op;
}
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
