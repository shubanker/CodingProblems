/**

Partition to K Equal Sum Subsets
Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.

 

Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false
 

Constraints:

1 <= k <= nums.length <= 16
1 <= nums[i] <= 104
The frequency of each element is in the range [1, 4].
 */
function canPartitionKSubsets(nums: number[], k: number): boolean {
  const sideLen = nums.reduce((a, b) => a + b) / k;
  if (sideLen !== ~~sideLen) {
    return false;
  }
  const memo = new Set();
  const partition = (id: number, sum: number, count: number) => {
    if (count == k - 1) {
      return true;
    }
    const key = nums.join(",");
    if (memo.has(key) || sum > sideLen) {
      return false;
    }
    if (sum === sideLen) {
      return partition(0, 0, count + 1);
    }
    for (let i = id; i < nums.length; i++) {
      if (nums[i] === null) {
        continue;
      }
      const num = nums[i];
      nums[i] = null;
      if (partition(i + 1, sum + num, count)) {
        return true;
      }
      nums[i] = num;
    }
    memo.add(key);
    return false;
  };
  return partition(0, 0, 0);
}
