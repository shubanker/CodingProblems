/**
Rectangle Area II
We are given a list of (axis-aligned) rectangles. Each rectangle[i] = [xi1, yi1, xi2, yi2] , where (xi1, yi1) are the coordinates of the bottom-left corner, and (xi2, yi2) are the coordinates of the top-right corner of the ith rectangle.

Find the total area covered by all rectangles in the plane. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:


Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
Explanation: As illustrated in the picture.
Example 2:

Input: rectangles = [[0,0,1000000000,1000000000]]
Output: 49
Explanation: The answer is 1018 modulo (109 + 7), which is (109)2 = (-7)2 = 49.
 

Constraints:

1 <= rectangles.length <= 200
rectanges[i].length = 4
0 <= rectangles[i][j] <= 109
The total area covered by all rectangles will never exceed 263 - 1 and thus will fit in a 64-bit signed integer.
 */
function rectangleArea(rectangles: number[][]): number {
  let N = rectangles.length;
  let xs = Array(N * 2).fill(0);
  let ys = Array(N * 2).fill(0);
  for (let i = 0; i < N; ++i) {
    xs[i * 2 + 0] = rectangles[i][0];
    ys[i * 2 + 0] = rectangles[i][1];
    xs[i * 2 + 1] = rectangles[i][2];
    ys[i * 2 + 1] = rectangles[i][3];
  }

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);

  let xsize = 0,
    ysize = 0;
  for (let i = 0; i < 2 * N; ++i) {
    if (i == 0 || xs[i] != xs[i - 1]) {
      xs[xsize++] = xs[i];
    }
  }
  for (let i = 0; i < 2 * N; ++i) {
    if (i == 0 || ys[i] != ys[i - 1]) {
      ys[ysize++] = ys[i];
    }
  }

  let res = 0;
  for (let i = 0; i + 1 < xsize; ++i) {
    for (let j = 0; j + 1 < ysize; ++j) {
      let x0 = xs[i],
        x1 = xs[i + 1];
      let y0 = ys[j],
        y1 = ys[j + 1];
      for (let k = 0; k < N; ++k) {
        if (rectangles[k][0] <= x0 && x1 <= rectangles[k][2] && rectangles[k][1] <= y0 && y1 <= rectangles[k][3]) {
          res += (x1 - x0) * (y1 - y0);
          res %= 1000000007;
          break;
        }
      }
    }
  }

  return res;
}
