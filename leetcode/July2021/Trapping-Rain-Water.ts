/**
Trapping Rain Water
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

 

Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
0 <= n <= 3 * 10^4
0 <= height[i] <= 10^5

 */
function trap(height: number[]): number {
  if (height.length < 3) {
    return 0;
  }
  const leftArr = [height[0]];
  const rightArr = [];
  rightArr[height.length - 1] = height[height.length - 1];
  for (let i = 1; i < height.length; i++) {
    leftArr[i] = Math.max(leftArr[i - 1], height[i]);
  }

  for (let i = height.length - 2; i >= 0; i--) {
    rightArr[i] = Math.max(rightArr[i + 1], height[i]);
  }

  let result = 0;
  for (let i = 0; i < height.length; i++) {
    result += Math.min(leftArr[i], rightArr[i]) - height[i];
  }
  return result;
}
