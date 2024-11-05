/**
229. Majority Element II
Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 

Example 1:

Input: nums = [3,2,3]
Output: [3]
Example 2:

Input: nums = [1]
Output: [1]
Example 3:

Input: nums = [1,2]
Output: [1,2]
 

Constraints:

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109
 

Follow up: Could you solve the problem in linear time and in O(1) space?
 */

function majorityElement_(nums: number[]): number[] {
  let map = new Map<number, number>();
  nums.forEach((element) => map.set(element, (map.get(element) ?? 0) + 1));
  const threshold = nums.length / 3,
    op = [];
  for (let [el, count] of map) {
    count > threshold && op.push(el);
  }
  return op;
}
function majorityElement(nums: number[]): number[] {
  let indexes = [-1, -1],
    counts = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[indexes[0]]) {
      counts[0]++;
    } else if (nums[i] === nums[indexes[1]]) {
      counts[1]++;
    } else if (counts[0] == 0) {
      indexes[0] = i;
      counts[0] = 1;
    } else if (counts[1] == 0) {
      indexes[1] == i;
      counts[1] = 1;
    } else {
      counts[0]--;
      counts[1]--;
    }
    console.log(counts);
    console.log(indexes);
  }
  counts[0] = counts[1] = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[indexes[0]]) {
      counts[0]++;
    } else if (nums[i] === nums[indexes[1]]) {
      counts[1]++;
    }
  }
  let op = [];
  if (counts[0] > nums.length / 3) {
    op.push(nums[indexes[0]]);
  }
  if (counts[1] > nums.length / 3) {
    op.push(nums[indexes[1]]);
  }
  console.log(indexes);
  return op;
}
console.log(majorityElement([1, 2]));
