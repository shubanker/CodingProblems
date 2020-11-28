/**
Partition Equal Subset Sum
Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
 */
let memo: Record<string, boolean>;
function canPartition(nums: number[]): boolean {
  if (nums.length < 2) {
    return false;
  }
  let sum = nums.reduce((a, b) => a + b);
  if (sum % 2 == 1) {
    return false;
  }
  const requiredSum = sum / 2;
  memo = {};
  return checkForPartitionSum(nums, requiredSum, 1, nums[0]);
}
function checkForPartitionSum(set: number[], requiredSum: number, index: number, sum: number) {
  const key = `${sum}-${index}`;
  if (memo[key] !== void 0) {
    return memo[key];
  }

  if (requiredSum === sum) {
    return true;
  }
  if (index === set.length || sum > requiredSum) {
    return false;
  }
  return (memo[key] =
    checkForPartitionSum(set, requiredSum, index + 1, sum) ||
    checkForPartitionSum(set, requiredSum, index + 1, sum + set[index]));
}

console.log(canPartition([1, 2, 5]));
