/**
 Given the coordinates of four points in 2D space, return whether the four points could construct a square.

The coordinate (x,y) of a point is represented by an integer array with two integers.

Example:

Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
Output: True
 

Note:

All the input integers are in the range [-10000, 10000].
A valid square has four equal sides with positive length and four equal angles (90-degree angles).
Input points have no order.
 */

/**
 *
 * Logic 1 using XOR
 * wont work for tilted squares
 */
function validSquare_1(p1: number[], p2: number[], p3: number[], p4: number[]): boolean {
  let x: number = p1[0];
  let y: number = p1[1];
  [p2, p3, p4].forEach((coOrdinate) => {
    x ^= coOrdinate[0];
    y ^= coOrdinate[1];
  });
  return !x && !y;
}
function validSquare(p1: number[], p2: number[], p3: number[], p4: number[]): boolean {
  const points = [p1, p2, p3, p4].sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  const getDistanceSq = (p1: number[], p2: number[]) => {
    return Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[0] - p2[0], 2);
  };
  const side1 = getDistanceSq(points[0], points[1]);
  const side2 = getDistanceSq(points[0], points[2]);
  const digonal = getDistanceSq(points[0], points[3]);

  return side1 > 0 && side1 === side2 && digonal === side1 * 2;
}

//Tests

console.log(validSquare([0, 0], [1, 1], [1, 0], [0, 1]));
