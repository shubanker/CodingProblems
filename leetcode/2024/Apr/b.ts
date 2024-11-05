/**
2334. Subarray With Elements Greater Than Varying Threshold
You are given an integer array nums and an integer threshold.

Find any subarray of nums of length k such that every element in the subarray is greater than threshold / k.

Return the size of any such subarray. If there is no such subarray, return -1.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,3,4,3,1], threshold = 6
Output: 3
Explanation: The subarray [3,4,3] has a size of 3, and every element is greater than 6 / 3 = 2.
Note that this is the only valid subarray.
Example 2:

Input: nums = [6,5,6,5,8], threshold = 7
Output: 1
Explanation: The subarray [8] has a size of 1, and 8 > 7 / 1 = 7. So 1 is returned.
Note that the subarray [6,5] has a size of 2, and every element is greater than 7 / 2 = 3.5. 
Similarly, the subarrays [6,5,6], [6,5,6,5], [6,5,6,5,8] also satisfy the given conditions.
Therefore, 2, 3, 4, or 5 may also be returned.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i], threshold <= 109
 */

function validSubarraySize(nums: number[], threshold: number): number {
  const p: number[] = [];
  const size: number[] = Array(nums.length).fill(1);
  const visited: boolean[] = [];
  const arr: number[][] = [];
  const find = (x: number) => {
    if (p[x] !== x) {
      p[x] = find(p[x]);
    }
    return p[x];
  };
  const merge = (a: number, b: number) => {
    const pa = find(a),
      pb = find(b);
    if (pa == pb) {
      return;
    }
    p[pa] = pb;
    size[pb] += size[pa];
  };

  for (let i = 0; i < nums.length; i++) {
    p[i] = i;
    arr[i] = [nums[i], i];
  }
  arr.sort((a, b) => b[0] - a[0]);
  arr.forEach((e) => {
    let [v, i] = e;
    if (i > 0 && visited[i - 1]) {
      merge(i, i - 1);
    }
    if (i < nums.length - 1 && visited[i + 1]) {
      merge(i, i + 1);
    }
    if (v > threshold / size[find(i)]) {
      return size[find(i)];
    }
    visited[i] = true;
  });
  return -1;
}

// k>t/a[i]
