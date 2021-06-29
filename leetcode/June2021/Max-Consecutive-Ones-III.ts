/**
Max Consecutive Ones III
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

 

Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 

Constraints:

1 <= nums.length <= 10^5
nums[i] is either 0 or 1.
0 <= k <= nums.length
 */
function longestOnes(nums: number[], k: number): number {
  let bestCount = 0;
  let current = 0;
  let i = 0,
    j = 0;
  for (; i < nums.length && current < k; i++) {
    nums[i] === 0 && current++;
  }
  bestCount = i;
  for (; i < nums.length; i++) {
    if (!nums[i]) {
      bestCount = Math.max(bestCount, i - j);
      while (j < i && nums[j]) {
        j++;
      }
      j++;
    }
  }
  return Math.max(bestCount, i - j);
}
interface longestOnesNode {
  count: number;
  zerosRight: number;
  room: number;
}
function longestOnes_(nums: number[], k: number): number {
  const list: longestOnesNode[] = [{ count: 0, zerosRight: 0, room: 0 }];
  let previous = list[0];
  nums.forEach((n) => {
    if (n) {
      const newNode = {
        count: 1,
        zerosRight: 0,
        room: previous.zerosRight,
      };
      list.push(newNode);
      previous = newNode;
    } else {
      previous.zerosRight++;
      previous.room++;
    }
  });
  let bestCount = 0;
  return 5;
}

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2));
