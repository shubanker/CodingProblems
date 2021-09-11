/**
Burst Balloons
Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by array nums. You are asked to burst all the balloons. If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent.

Find the maximum coins you can collect by bursting the balloons wisely.

Note:

You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
Example:

Input: [3,1,5,8]
Output: 167 
Explanation: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
             coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
 */
function maxCoins(nums: number[]): number {
  let sum = 0;
  while (nums.length) {
    let minIndex = 0;
    if (nums.length !== 3) {
      for (let index = 1; index < nums.length; index++) {
        if (nums[index] < nums[minIndex]) {
          minIndex = index;
        }
      }
    } else {
      minIndex = 1;
    }
    sum += nums[minIndex] * (nums[minIndex - 1] || 1) * (nums[minIndex + 1] || 1);
    nums.splice(minIndex, 1);
  }
  return sum;
}
function maxCoins2(nums: number[]): number {
  let sum = 0;
  while (nums.length) {
    let midIndex = 0,
      lastMax = -Infinity;
    for (let index = 0; index < nums.length; index++) {
      const newMax = nums[index] * (nums[index - 1] || 1) * (nums[index + 1] || 1);
      if (newMax > lastMax) {
        lastMax = newMax;
        midIndex = index;
      }
    }
    sum += lastMax;
    nums.splice(midIndex, 1);
  }
  return sum;
}
console.log(maxCoins([3, 1, 5, 8]));
console.log(maxCoins2([9, 76, 64, 21]));
