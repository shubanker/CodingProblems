/**
46. Permutations

Given an array nums of distinct integers,
return all the possible permutations.
You can return the answer in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
 */
function permute(nums: number[]): number[][] {
  if (!nums.length) {
    return [];
  }
  if (nums.length === 1) {
    return [nums];
  }
  const last = nums.pop();
  const nestedPermute = permute(nums);
  const perm: number[][] = [];
  nestedPermute.forEach((ar) => {
    for (let i = 0; i <= ar.length; i++) {
      const copied = ar.slice();
      copied.splice(i, 0, last);
      perm.push(copied);
    }
  });
  return perm;
}
