/**
Next Permutation
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.

 

Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]
Example 4:

Input: nums = [1]
Output: [1]
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  let previous = nums.length - 1;
  for (let i = previous - 1; i >= 0; i--) {
    previous = i;
    if (nums[i + 1] > nums[i]) {
      break;
    }
  }
  let minIndex = previous + 1;
  for (let i = previous + 2; i < nums.length; i++) {
    if (nums[previous] < nums[i]) {
      if (nums[minIndex] > nums[i]) {
        minIndex = i;
      }
    }
  }
  if (minIndex < nums.length) {
    const t = nums[previous];
    nums[previous] = nums[minIndex];
    nums[minIndex] = t;
  }
  if (minIndex >= nums.length || nums[minIndex] > nums[previous]) {
    previous--;
  }

  for (let i = previous + 1; i < nums.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[minIndex] > nums[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const t = nums[minIndex];
      nums[minIndex] = nums[i];
      nums[i] = t;
    }
  }
  console.log(nums);
}
nextPermutation([1, 2, 3]);
nextPermutation([3, 2, 1]);
nextPermutation([1]);
