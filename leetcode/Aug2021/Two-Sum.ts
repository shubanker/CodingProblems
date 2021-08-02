/**
Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.
 

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
 */
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const missing = target - nums[i];
    if (map.has(missing)) {
      return [i, map.get(missing)];
    }
    map.set(nums[i], i);
  }
}
function twoSum_(nums: number[], target: number): number[] {
  const map = nums.reduce((map, num, i) => {
    if (!map.has(num)) {
      map.set(num, []);
    }
    map.get(num).push(i);
    return map;
  }, new Map<number, number[]>());
  for (let [num, index] of map) {
    const remaining = target - num;
    if (map.has(remaining)) {
      if (remaining === num) {
        if (index.length > 1) {
          return index.slice(0, 2);
        }
      } else {
        return [index[0], map.get(remaining)[0]];
      }
    }
  }
  return [-1, -1];
}
console.log(twoSum([3, 3], 6));
