/**
Subsets II
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
 */
function subsetsWithDup(nums: number[]): number[][] {
  const map = {},
    ans = [];
  backtrack([], 0);
  return ans;
  function backtrack(combination: any, pos: number) {
    combination.sort(function (a, b) {
      return a - b;
    });
    const key = combination.join("_");
    if (map[key] === undefined) {
      //Check if we can take a set without including the element at current 'pos'
      map[key] = true;
      ans.push(JSON.parse(JSON.stringify(combination)));
    }
    if (pos < nums.length) {
      //Call for next position (pos+1)
      backtrack(JSON.parse(JSON.stringify(combination)), pos + 1);
      combination.push(nums[pos]);
      backtrack(combination, pos + 1);
    }
  }
}
function subsetsWithDup_(nums: number[]): number[][] {
  const subSets = new Set<string>([""]);
  for (let i = 0; i < nums.length; i++) {
    const subs: number[] = [nums[i]];
    subSets.add(nums[i].toString());
    for (let j = i + 1; j < nums.length; j++) {
      subs.push(nums[j]);
      subSets.add(subs.toString());
    }
  }
  const op = [...subSets].map((x) => x.split(",").map(Number));
  op.unshift([]);
  return op;
}
