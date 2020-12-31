/**
Largest Rectangle in Histogram
Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

 


Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

 


The largest rectangle is shown in the shaded area, which has area = 10 unit.

 

Example:

Input: [2,1,5,6,2,3]
Output: 10
 */

//TODO: extreme slow approach, needs optimisation.
function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    let j = i;
    while (heights[i] <= heights[j] && j < heights.length) {
      j++;
    }
    let k = i;
    while (heights[i] <= heights[k] && k >= 0) {
      k--;
    }
    k++;

    maxArea = Math.max(maxArea, (j - k) * heights[i]);
  }
  return maxArea;
}
console.log(largestRectangleArea([2, 1, 2]));
