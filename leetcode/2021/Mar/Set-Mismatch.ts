import { runTests } from "../../test";

/**
Set Mismatch
You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

 

Example 1:

Input: nums = [1,2,2,4]
Output: [2,3]
Example 2:

Input: nums = [1,1]
Output: [1,2]
 

Constraints:

2 <= nums.length <= 104
1 <= nums[i] <= 104
 */
function findErrorNums(nums: number[]): number[] {
  let dup: number, missing: number;
  for (let i = 0; i < nums.length && !(dup && missing); i++) {
    const val = Math.abs(nums[i]);
    if (!dup && nums[val - 1] < 0) {
      dup = val;
    } else {
      nums[val - 1] *= -1;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      missing = i + 1;
      break;
    }
  }
  return [dup, missing];
}
console.log(
  runTests(
    [
      { arguments: [[1, 2, 3, 4, 5, 6, 8, 9, 9]], output: [9, 7] },
      { arguments: [[1, 1, 2, 3, 4, 5, 6, 8, 9]], output: [1, 7] },
      { arguments: [[3, 2, 2]], output: [2, 1] },
      { arguments: [[1, 1, 2, 3, 4, 5, 7, 8]], output: [1, 6] },
      { arguments: [[2, 3, 4, 4]], output: [4, 1] },
      { arguments: [[1, 2, 2, 4]], output: [2, 3] },
      { arguments: [[1, 1]], output: [1, 2] },
    ],
    findErrorNums,
    (a, b) => a.join() === b.join()
  )
);
