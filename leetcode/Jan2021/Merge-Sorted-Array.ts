/**
 * 
Merge Sorted Array
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

The number of elements initialized in nums1 and nums2 are m and n respectively. You may assume that nums1 has enough space (size that is equal to m + n) to hold additional elements from nums2.

 

Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Example 2:

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
 

Constraints:

0 <= n, m <= 200
1 <= n + m <= 200
nums1.length == m + n
nums2.length == n
-109 <= nums1[i], nums2[i] <= 109
 */
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  nums1.length = m;
  nums2.length = n;
  let min = 0;
  let max = nums1.length,
    mid: number = 0;
  nums2.forEach((num) => {
    while (min < max) {
      mid = min + Math.floor((max - min) / 2);
      if (nums1[mid] === num) {
        break;
      } else if (nums1[mid] < num) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    mid = Math.max(0, mid - 2);
    while (nums1[mid] < num) {
      mid++;
    }
    nums1.splice(mid, 0, num);
    min = mid;
  });
}
const a = [4, 5, 6, 0, 0, 0];
merge(a, 3, [1, 2, 3], 3);
console.log(a);
