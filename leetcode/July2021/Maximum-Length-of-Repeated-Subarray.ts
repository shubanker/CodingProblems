/**
Maximum Length of Repeated Subarray
Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

 

Example 1:

Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].
Example 2:

Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 100
 */
function findLength(nums1: number[], nums2: number[]): number {
  const DP = new Array(nums1.length).fill(0).map(() => Array(nums2.length).fill(0));
  let max = 0;
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums2[j] == nums1[i]) {
        DP[i][j] = (DP[i - 1]?.[j - 1] ?? 0) + 1;
        max = Math.max(DP[i][j], max);
      }
    }
  }
  return max;
}
