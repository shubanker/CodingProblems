/**
https://leetcode.com/problems/median-of-two-sorted-arrays/solution/
Median of Two Sorted Arrays

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
Example 3:

Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
Example 4:

Input: nums1 = [], nums2 = [1]
Output: 1.00000
Example 5:

Input: nums1 = [2], nums2 = []
Output: 2.00000
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-10^6 <= nums1[i], nums2[i] <= 10^6
 */

import { runTests } from "../../test";
function findMedianSortedArrays(nums1: number[], nums2: number[]) {
  const newArLen = nums1.length + nums2.length;
  let mid = Math.floor(newArLen / 2) - ((newArLen + 1) % 2);
  let n1 = 0,
    n2 = 0;
  while (mid > 0 && n1 < nums1.length && n2 < nums2.length) {
    mid--;
    if (nums1[n1] > nums2[n2]) {
      n2++;
    } else {
      n1++;
    }
  }
  if (mid > 0) {
    if (nums1.length > n1) {
      n1 += mid;
    } else {
      n2 += mid;
    }
  }
  let median: number = Math.min(nums1[n1] ?? Infinity, nums2[n2] ?? Infinity);
  if (newArLen % 2 == 0) {
    const tempAr = [nums1[n1] ?? Infinity, nums2[n2] ?? Infinity, nums1[n1 + 1] ?? Infinity, nums2[n2 + 1] ?? Infinity];
    tempAr.splice(tempAr.indexOf(median), 1);
    median += Math.min(...tempAr);
    median /= 2;
  }
  return median;
}
function findMedianSortedArrays_exp(nums1: number[], nums2: number[]): number {
  const newArLen = nums1.length + nums2.length;
  let mid = Math.floor(newArLen / 2) - ((newArLen + 1) % 2);
  //   if (nums1.length > nums2.length) {
  //     const t = nums1;
  //     nums1 = nums2;
  //     nums2 = t;
  //   }
  let n1 = 0,
    n2 = 0;
  while (mid > 0 && n1 < nums1.length && n2 < nums2.length) {
    const needle = nums2[n2];
    let low = n1,
      up = nums1.length,
      m: number = -1;
    while (low < up) {
      m = low + Math.floor((up - low) / 2);
      if (nums1[m] === needle) {
        break;
      } else if (nums1[m] > needle) {
        up = m - 1;
      } else {
        low = m + 1;
      }
    }
    m++;
    while (m >= nums1.length || nums1[m] > needle) {
      m--;
    }
    m++;
    if (mid <= m) {
      break;
    } else {
      mid -= m + 1;
      n1 = m;
      n2++;
    }
  }
  let median: number = -1;
  if (n1 + mid < nums1.length) {
    median = Math.min(nums1[n1 + mid], nums2[n2] ?? Infinity);
  } else {
    mid -= nums1.length - n1;
    n1 = nums1.length;
    if (n2 + mid >= nums2.length) {
      median = nums2[nums2.length - 1];
    } else {
      median = nums2[n2 + mid];
    }
  }
  if (newArLen % 2 == 0) {
    let nextNo = n1 + mid < nums1.length && n2 < nums2.length ? Math.max(nums1[n1 + mid], nums2[n2]) : Infinity;
    if (n1 + mid < nums1.length) {
      median += Math.min(nums1[n1 + mid + 1] ?? Infinity, nums2[n2 + 1] ?? Infinity, nextNo);
    } else {
      median += Math.min(nextNo, nums2[n2 + mid + 1]);
    }
    median = median / 2;
  }
  return median;
}
function findMedianSortedArrays_normal(nums1: number[], nums2: number[]): number {
  const mergedAr = [];
  let n1 = 0,
    n2 = 0;
  while (n1 < nums1.length || n2 < nums2.length) {
    if (nums2[n2] < nums1[n1]) {
      mergedAr.push(nums2[n2++]);
    } else {
      mergedAr.push(nums1[n1++]);
    }
  }
  let mid = mergedAr[Math.floor(mergedAr.length / 2)];
  if (mergedAr.length && mergedAr.length % 2 == 0) {
    mid += mergedAr[Math.floor(mergedAr.length / 2) + 1] || 0;
    mid = mid / 2;
  }
  return mid;
}

console.log(findMedianSortedArrays([1, 4], [2, 3, 5, 6, 7]));

console.log(
  runTests(
    [
      {
        arguments: [[1, 3], [2]],
        output: 2,
      },
      {
        arguments: [
          [1, 2],
          [3, 4],
        ],
        output: 2.5,
      },
      {
        arguments: [
          [4, 4],
          [3, 4, 5],
        ],
        output: 4,
      },
      {
        arguments: [[3], [-2, -1]],
        output: -1,
      },
      {
        arguments: [[], [1, 2, 3, 4]],
        output: 2.5,
      },
      {
        arguments: [
          [1, 2],
          [-1, 3],
        ],
        output: 1.5,
      },
      {
        arguments: [[1], [2, 3, 4]],
        output: 2.5,
      },
      {
        arguments: [[1], [2, 3, 4, 5]],
        output: 3,
      },
      {
        arguments: [[1, 3, 4, 5], [2]],
        output: 3,
      },
      {
        arguments: [[2], [1, 3, 4, 5]],
        output: 3,
      },
      {
        arguments: [
          [1, 3],
          [2, 4, 5],
        ],
        output: 3,
      },
      {
        arguments: [
          [1, 4],
          [2, 3, 5, 6, 7],
        ],
        output: 4,
      },
    ],
    findMedianSortedArrays
  )
);
