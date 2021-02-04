/**
Longest Harmonious Subsequence
We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.

Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

A subsequence of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].
Example 2:

Input: nums = [1,2,3,4]
Output: 2
Example 3:

Input: nums = [1,1,1,1]
Output: 0
 

Constraints:

1 <= nums.length <= 2 * 10^4
-10^9 <= nums[i] <= 10^9
 */
const findLHS = (nums: number[]) => {
  const memo = new Map<number, number>();
  nums.forEach((n) => {
    memo.set(n, (memo.get(n) || 0) + 1);
  });
  let result = 0;
  for (const [key, val] of memo) {
    if (memo.has(key + 1)) {
      result = Math.max(result, val + memo.get(key + 1));
    }
  }
  return result;
};
const findLHS2 = (nums: number[]) => {
  const map: Record<string, number> = Object.create(null);
  const distinctSet = new Set(nums);
  const incrementMapVal = (n: string) => {
    if (!map[n]) {
      map[n] = 0;
    }
    map[n]++;
  };
  nums.forEach((n) => {
    if (distinctSet.has(n - 1)) {
      incrementMapVal(`${n - 1},${n}`);
    }
    if (distinctSet.has(n + 1)) {
      incrementMapVal(`${n},${n + 1}`);
    }
  });
  return Math.max(0, ...Object.values(map));
};
console.log(findLHS([1, 3, 2, 2, 5, 2, 3, 7]));
console.log(findLHS([1, 1, 3, 6, 8, 2]));
