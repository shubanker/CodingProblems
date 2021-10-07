/**
Jump Game
You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 105
 */
function canJump(nums: number[]): boolean {
  const visitedIndex = new Set<number>();
  let stack = new Set([0]);
  while (stack.size > 0) {
    const nextStack = new Set<number>();
    for (let index of stack) {
      visitedIndex.add(Number(index));
      if (nums.length - index - 1 <= nums[index]) {
        return true;
      }
      for (let i = 1; i <= nums[index]; i++) {
        const nextIndex = index + i;
        if (!visitedIndex.has(nextIndex)) {
          nextStack.add(nextIndex);
        }
      }
    }
    stack = nextStack;
  }
  return false;
}
console.log(canJump([0]));
// console.log(canJump([3, 2, 1, 0, 4]));

//Better approach
function canJump_(nums: number[]): boolean {
  // const canJumpArr = new Array(nums.length);
  let leftmostGoodPosition = nums.length - 1;
  // canJumpArr[nums.length - 1] = true;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= leftmostGoodPosition) {
      leftmostGoodPosition = i;
    }
  }
  return leftmostGoodPosition === 0;
}
