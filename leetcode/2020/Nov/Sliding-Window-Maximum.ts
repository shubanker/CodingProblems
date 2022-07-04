/**
Sliding Window Maximum
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.
Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
Example 3:

Input: nums = [1,-1], k = 1
Output: [1,-1]
Example 4:

Input: nums = [9,11], k = 2
Output: [11]
Example 5:

Input: nums = [4,-2], k = 2
Output: [4]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  let lastMaxIndex = -1;
  const op = [];
  for (let start = 0, end = k - 1; end < nums.length; start++, end++) {
    if (lastMaxIndex >= start) {
      if (nums[lastMaxIndex] <= nums[end]) {
        lastMaxIndex = end;
      }
    } else {
      lastMaxIndex = start;
      for (let newIndex = start + 1; newIndex <= end; newIndex++) {
        if (nums[newIndex] >= nums[lastMaxIndex]) {
          lastMaxIndex = newIndex;
        }
      }
    }
    op.push(nums[lastMaxIndex]);
  }
  return op;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(maxSlidingWindow([1], 1));
console.log(maxSlidingWindow([1, -1], 1));
console.log(maxSlidingWindow([9, 11], 2));
console.log(maxSlidingWindow([4, -2], 2));
