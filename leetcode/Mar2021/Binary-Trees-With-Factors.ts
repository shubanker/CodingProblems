/**
Binary Trees With Factors
Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.

 

Example 1:

Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: [2], [4], [4, 2, 2]
Example 2:

Input: arr = [2,4,5,10]
Output: 7
Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].
 

Constraints:

1 <= arr.length <= 1000
2 <= arr[i] <= 109
 */
function numFactoredBinaryTrees(arr: number[]): number {
  if (!arr || arr.length === 0) {
    return 0;
  }
  const modulo = Math.pow(10, 9) + 7;
  arr.sort((a, b) => a - b);
  const map = new Map<number, number>();
  let sum = 0;
  arr.forEach((e, i) => {
    let count = 1;
    sum -= map.get(e) ?? 0;
    for (let j = 0; j < i; j++) {
      const e2 = arr[j];
      const div = Math.floor(e / e2);
      if (e % e2 === 0 && map.has(div)) {
        count += map.get(e2) * map.get(div);
      }
    }
    sum += count;
    if (sum > modulo) {
      sum %= modulo;
    }
    map.set(e, count);
  });
  return sum;
}
function numFactoredBinaryTrees_(arr: number[]): number {
  const sets = new Set(arr);
  const modulo = Math.pow(10, 9) + 7;
  let count = 0;
  arr.forEach((e) => {
    arr.forEach((e2) => {
      if (sets.has(e * e2)) {
        count++;
        if (count > modulo) {
          count %= modulo;
        }
      }
    });
  });
  return (count + sets.size) % modulo;
}
