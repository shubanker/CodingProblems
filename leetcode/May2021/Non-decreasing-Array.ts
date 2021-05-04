/**
Non-decreasing Array
Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.

We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).

 

Example 1:

Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
Example 2:

Input: nums = [4,2,1]
Output: false
Explanation: You can't get a non-decreasing array by modify at most one element.
 

Constraints:

n == nums.length
1 <= n <= 104
-10^5 <= nums[i] <= 10^5
 */
function checkPossibility(nums: number[]): boolean {
  let availbleOptions = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      if (availbleOptions <= 0) {
        return false;
      }
      if (i < 2 || nums[i - 2] <= nums[i]) {
        nums[i - 1] = nums[i];
      }
      //else, try to make nums[i] as nums[i-1]
      else {
        nums[i] = nums[i - 1];
      }
      availbleOptions--;
    }
  }
  return availbleOptions >= 0;
}
checkPossibility([4, 2, 3]);
checkPossibility([5, 7, 1, 8]);
checkPossibility([3, 4, 2, 3]);
