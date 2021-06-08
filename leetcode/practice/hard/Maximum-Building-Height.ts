/**
Maximum-Building-Height
https://leetcode.com/problems/maximum-building-height/

You want to build n new buildings in a city. The new buildings will be built in a line and are labeled from 1 to n.

However, there are city restrictions on the heights of the new buildings:

The height of each building must be a non-negative integer.
The height of the first building must be 0.
The height difference between any two adjacent buildings cannot exceed 1.
Additionally, there are city restrictions on the maximum height of specific buildings. These restrictions are given as a 2D integer array restrictions where restrictions[i] = [idi, maxHeighti] indicates that building idi must have a height less than or equal to maxHeighti.

It is guaranteed that each building will appear at most once in restrictions, and building 1 will not be in restrictions.

Return the maximum possible height of the tallest building.

 

Example 1:


Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,1,2], and the tallest building has a height of 2.
Example 2:


Input: n = 6, restrictions = []
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,4,5], and the tallest building has a height of 5.
Example 3:


Input: n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,3,4,4,5,4,3], and the tallest building has a height of 5.
 

Constraints:

2 <= n <= 109
0 <= restrictions.length <= min(n - 1, 105)
2 <= idi <= n
idi is unique.
0 <= maxHeighti <= 109
 */
function maxBuilding(n: number, restrictions: number[][]): number {
  if (!restrictions.length) {
    return n - 1;
  }
  restrictions.push([1, 0]);
  restrictions.push([n, Number.MAX_SAFE_INTEGER]);
  restrictions.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < restrictions.length; i++) {
    const dist = restrictions[i][0] - restrictions[i - 1][0];
    restrictions[i][1] = Math.min(restrictions[i][1], dist + restrictions[i - 1][1]);
  }
  for (let i = restrictions.length - 2; i >= 0; i--) {
    const dist = restrictions[i + 1][0] - restrictions[i][0];
    restrictions[i][1] = Math.min(restrictions[i][1], restrictions[i + 1][1] + dist);
  }
  let max = 0;
  for (let i = 1; i < restrictions.length; i++) {
    let dist = restrictions[i][0] - restrictions[i - 1][0];
    const blockMax = Math.max(restrictions[i][1], restrictions[i - 1][1]);
    max = Math.max(max, blockMax);
    const blockMin = Math.min(restrictions[i][1], restrictions[i - 1][1]);
    dist -= blockMax - blockMin;
    max = Math.max(max, blockMax + Math.floor(dist / 2));
  }
  return max;
}
console.log(
  maxBuilding(5, [
    [2, 1],
    [4, 1],
  ])
);
