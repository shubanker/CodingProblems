/**
3Sum Closest
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 

Constraints:

3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4
 */
function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let minDif = Number.MAX_SAFE_INTEGER;
  let closest: number;
  for (let i = 0; i < nums.length - 2; i++) {
    let start = i + 1,
      end = nums.length - 1;
    while (start < end) {
      let sum = nums[i] + nums[start] + nums[end];
      if (sum == target) {
        return target;
      }
      const remainder = target - sum;
      if (Math.abs(remainder) < minDif) {
        minDif = Math.abs(remainder);
        closest = sum;
      }
      if (remainder > 0) {
        start++;
      } else {
        end--;
      }
    }
  }
  return closest;
}
