/**
Kth Largest Element in an Array
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note:
You may assume k is always valid, 1 ≤ k ≤ array's length.
 */

// Aparently this beats sorting upto k index
function findKthLargest(nums: number[], k: number): number {
  return nums.sort((a, b) => a - b)[nums.length - k];
}

function findKthLargest2(nums: number[], k: number): number {
  for (let i = 0; i < k; i++) {
    let swap = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[swap] < nums[j]) {
        swap = j;
      }
    }
    if (i !== swap) {
      const t = nums[swap];
      nums[swap] = nums[i];
      nums[i] = t;
    }
  }
  return nums[k - 1];
}
