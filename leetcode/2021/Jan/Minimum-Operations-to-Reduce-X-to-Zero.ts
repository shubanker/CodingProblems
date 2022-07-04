/**
Minimum Operations to Reduce X to Zero
You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.

Return the minimum number of operations to reduce x to exactly 0 if it's possible, otherwise, return -1.

 

Example 1:

Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.
Example 2:

Input: nums = [5,6,7,8,9], x = 4
Output: -1
Example 3:

Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 104
1 <= x <= 109
 */
function minOperations(nums: number[], x: number): number {
  const totalSum = nums.reduce((a, b) => a + b);
  let target = totalSum - x;
  const hashMap = new Map<number, number>();
  hashMap.set(0, -1);
  let maxLen = -1,
    preSum = 0;
  nums.forEach((n, i) => {
    preSum += n;
    hashMap.set(preSum, i);
    if (hashMap.has(preSum - target)) {
      maxLen = Math.max(maxLen, i - hashMap.get(preSum - target));
    }
  });
  return maxLen === -1 ? -1 : nums.length - maxLen;
}

//Using Dikstra
function minOperations_2(nums: number[], x: number): number {
  const res = minOpsDikstra(nums, x, 0, 0, new Map());
  if (res === Infinity) {
    return -1;
  }
  return res;
}
const minOpsDikstra = (nums: number[], x: number, i: number, j: number, memo: Map<string, number>) => {
  if (memo.has(`${i},${j}`)) {
    return memo.get(`${i},${j}`);
  }
  let val: number;
  if (x < 0 || i + j > nums.length) {
    val = Infinity;
  } else if (x == 0) {
    val = i + j;
  } else {
    val = Math.min(
      i < nums.length ? minOpsDikstra(nums, x - nums[i], i + 1, j, memo) : Infinity,
      j < nums.length ? minOpsDikstra(nums, x - nums[nums.length - 1 - j], i, j + 1, memo) : Infinity
    );
  }
  memo.set(`${i},${j}`, val);
  return val;
};
// console.log(minOperations([1, 1, 4, 2, 3], 5));
// console.log(minOperations([5, 6, 7, 8, 9], 4));
console.log(minOperations([1, 1], 3));
