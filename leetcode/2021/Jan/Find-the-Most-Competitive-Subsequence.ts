/**
Find the Most Competitive Subsequence
Given an integer array nums and a positive integer k, return the most competitive subsequence of nums of size k.

An array's subsequence is a resulting sequence obtained by erasing some (possibly zero) elements from the array.

We define that a subsequence a is more competitive than a subsequence b (of the same length) if in the first position where a and b differ, subsequence a has a number less than the corresponding number in b. For example, [1,3,4] is more competitive than [1,3,5] because the first position they differ is at the final number, and 4 is less than 5.

 

Example 1:

Input: nums = [3,5,2,6], k = 2
Output: [2,6]
Explanation: Among the set of every possible subsequence: {[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]}, [2,6] is the most competitive.
Example 2:

Input: nums = [2,4,3,3,5,4,9,6], k = 4
Output: [2,3,3,4]
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
1 <= k <= nums.length
 */

function mostCompetitive(nums: number[], k: number): number[] {
  const stack: number[] = [];
  let notRequiredCount = nums.length - k;
  const peek = (ar: number[]) => ar[ar.length - 1];
  nums.forEach((n) => {
    while (stack.length && notRequiredCount > 0 && peek(stack) > n) {
      stack.pop();
      notRequiredCount--;
    }
    stack.push(n);
  });
  return stack.slice(0, k);
}

//Alternative slow approach.
function mostCompetitive2(nums: number[], k: number): number[] {
  return getMostCompetitive(nums, k, 0);
}
function getMostCompetitive(nums: number[], k: number, start: number) {
  if (nums.length - start <= k) {
    return nums.splice(start);
  }
  let min = start;
  for (let i = start + 1; i <= nums.length - k; i++) {
    if (nums[min] > nums[i]) {
      min = i;
    }
  }
  if (k == 1) {
    return [nums[min]];
  }
  return [nums[min], ...getMostCompetitive(nums, k - 1, min + 1)];
}
console.log(mostCompetitive([3, 5, 2, 6], 2));
