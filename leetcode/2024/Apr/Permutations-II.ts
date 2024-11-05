/**
47. Permutations II

Given a collection of numbers, nums, 
that might contain duplicates, 
return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
 */

function permuteUnique(nums: number[]): number[][] {
  const results = [];
  const curr = [];
  const numsLeft = {};
  for (let num of nums) numsLeft[num] = numsLeft[num] ? numsLeft[num] + 1 : 1;

  const recurse = () => {
    //base case
    if (curr.length === nums.length) {
      results.push([...curr]);
      return;
    }

    for (let num of Object.keys(numsLeft)) {
      if (numsLeft[num] === 0) continue;
      numsLeft[num]--;
      curr.push(num);
      recurse();
      curr.pop();
      numsLeft[num]++;
    }
  };

  recurse();
  return results;
}
