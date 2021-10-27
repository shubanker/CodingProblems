/**
Sort Colors
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

 

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
Example 3:

Input: nums = [0]
Output: [0]
Example 4:

Input: nums = [1]
Output: [1]
 

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is 0, 1, or 2.
 */
function sortColors(nums: number[]): void {
  const distinctItemsOrder = [0, 1, 2];
  let currentIndex = 0;
  let leftPtr = 0,
    right = 1;

  while (currentIndex < distinctItemsOrder.length) {
    while (nums[leftPtr] === distinctItemsOrder[currentIndex]) {
      leftPtr++;
    }
    if (leftPtr === nums.length) {
      break;
    }
    right = leftPtr + 1;
    while (right < nums.length && nums[right] !== distinctItemsOrder[currentIndex]) {
      right++;
    }
    if (right === nums.length) {
      currentIndex++;
      right = leftPtr + 1;
    } else {
      console.log({ leftPtr, right });
      [nums[leftPtr], nums[right]] = [nums[right], nums[leftPtr]];
      right++;
    }
  }
}
console.log(sortColors([2, 0, 2, 1, 1, 0]));
