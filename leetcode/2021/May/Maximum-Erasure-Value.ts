/**
Maximum Erasure Value
You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.

Return the maximum score you can get by erasing exactly one subarray.

An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

 

Example 1:

Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].
Example 2:

Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 104
 */
function maximumUniqueSubarray(nums: number[]): number {
  let max = 0;
  let sumUntil = 0;
  let p1 = 0;
  let lookupSet = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    if (lookupSet.has(nums[i])) {
      max = Math.max(max, sumUntil);
      while (nums[p1] !== nums[i]) {
        lookupSet.delete(nums[p1]);
        sumUntil -= nums[p1++];
      }
      p1++;
    } else {
      sumUntil += nums[i];
      lookupSet.add(nums[i]);
    }
  }
  return Math.max(max, sumUntil);
}
