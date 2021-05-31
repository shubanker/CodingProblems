import { runTests } from "../../test";

/**
Minimize Deviation in Array
You are given an array nums of n positive integers.

You can perform two types of operations on any element of the array any number of times:

If the element is even, divide it by 2.
For example, if the array is [1,2,3,4], then you can do this operation on the last element, and the array will be [1,2,3,2].
If the element is odd, multiply it by 2.
For example, if the array is [1,2,3,4], then you can do this operation on the first element, and the array will be [2,2,3,4].
The deviation of the array is the maximum difference between any two elements in the array.

Return the minimum deviation the array can have after performing some number of operations.

 

Example 1:

Input: nums = [1,2,3,4]
Output: 1
Explanation: You can transform the array to [1,2,3,2], then to [2,2,3,2], then the deviation will be 3 - 2 = 1.
Example 2:

Input: nums = [4,1,5,20,3]
Output: 3
Explanation: You can transform the array after two operations to [4,2,5,5,3], then the deviation will be 5 - 2 = 3.
Example 3:

Input: nums = [2,10,8]
Output: 3
 

Constraints:

n == nums.length
2 <= n <= 10^5
1 <= nums[i] <= 10^9
 */
function minimumDeviation(nums: number[]): number {
  //TODO: convert into binary tree
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 1) {
      nums[i] *= 2;
    }
  }
  const getMaxMin = () => {
    let maxIndex = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  };
  nums.sort((a, b) => a - b);
  let minDeviation = Infinity;
  while (true) {
    const maxIndex = getMaxMin();
    minDeviation = Math.min(minDeviation, nums[maxIndex] - nums[0]);
    if (nums[maxIndex] % 2 == 0) {
      nums[maxIndex] /= 2;
      if (nums[maxIndex] < nums[0]) {
        const t = nums[0];
        nums[0] = nums[maxIndex];
        nums[maxIndex] = t;
      }
    } else {
      return minDeviation;
    }
  }
}

console.log(minimumDeviation([399, 908, 648, 357, 693, 502, 331, 649, 596, 698]));
console.log(
  runTests(
    [
      { arguments: [[5, 1, 2, 8]], output: 3 },
      { arguments: [[2, 10, 8]], output: 3 },
      { arguments: [[3, 5]], output: 1 },
      { arguments: [[4, 9, 4, 5]], output: 5 },
      { arguments: [[399, 908, 648, 357, 693, 502, 331, 649, 596, 698]], output: 315 },
      { arguments: [[2, 10, 8, 63, 5, 10, 8, 7, 9, 6, 2, 5, 3, 6, 65, 12]], output: 63 },
    ],
    minimumDeviation
  )
);

//Optimal approach

function minimumDeviation_(nums: number[]): number {
  function sink(parent: number) {
    let child = parent * 2 + 1;
    while (child < nums.length) {
      let child2 = child + 1;
      if (child2 < nums.length && nums[child2] > nums[child]) child = child2;
      if (nums[child] > nums[parent]) {
        let t = nums[child];
        nums[child] = nums[parent];
        nums[parent] = t;
        parent = child;
        child = parent * 2 + 1;
      } else {
        break;
      }
    }
  }

  function build() {
    for (let i = (nums.length - 2) >> 1; i >= 0; i -= 1) {
      sink(i);
    }
  }

  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] % 2 === 1) nums[i] *= 2;
  }
  nums = [...new Set(nums)];

  build();

  let min = Math.min(...nums);
  let max = nums[0];
  let ans = max - min;
  while (max % 2 === 0) {
    max = max / 2;
    if (max < min) min = max;
    nums[0] = max;
    sink(0);
    max = nums[0];
    ans = Math.min(ans, max - min);
  }
  return ans;
}
