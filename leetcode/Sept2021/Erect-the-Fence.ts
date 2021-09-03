/**
Erect the Fence
You are given an array trees where trees[i] = [xi, yi] represents the location of a tree in the garden.

You are asked to fence the entire garden using the minimum length of rope as it is expensive. The garden is well fenced only if all the trees are enclosed.

Return the coordinates of trees that are exactly located on the fence perimeter.

 

Example 1:


Input: points = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[3,3],[2,4],[4,2]]
Example 2:


Input: points = [[1,2],[2,2],[4,2]]
Output: [[4,2],[2,2],[1,2]]
 

Constraints:

1 <= points.length <= 3000
points[i].length == 2
0 <= xi, yi <= 100
All the given points are unique.
 */

function outerTrees(points: number[][]): number[][] {
  // If points are less than or equal to 3, we don't have to find the boundary.
  if (points.length <= 3) {
    return points;
  }

  // Finding left, lowest point for starting point
  points.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  // Get the counter clockwise value, if v is positive number, point c is in the counter clockwise position of line between a and b
  // If v is 0, point c is in the same clockwise position with line between a and b
  const crossProduct = (a, b, c) => {
    let v = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    return v;
  };

  // Get a distance between the two points
  const dist = (a, b) => {
    let [dx, dy] = [a[0] - b[0], a[1] - b[1]];
    return dx * dx + dy * dy;
  };

  let endPoint = [...points[0]];
  let previousPoint = [...endPoint];
  let out: number[][] = [];
  let used = new Set();
  let start = true;
  while (start || (previousPoint && !(previousPoint[0] === endPoint[0] && previousPoint[1] === endPoint[1]))) {
    start = false;
    let curPoint = null;
    let colliner = [];
    for (let [x, y] of points) {
      if (used.has(x + "," + y) || (previousPoint[0] === x && previousPoint[1] == y)) {
        continue;
      }
      if (!curPoint || crossProduct(previousPoint, curPoint, [x, y]) > 0) {
        curPoint = [x, y];
        colliner = [[x, y]];
      } else if (crossProduct(previousPoint, curPoint, [x, y]) === 0) {
        if (dist(previousPoint, [x, y]) > dist(previousPoint, curPoint)) {
          curPoint = [x, y];
        }
        colliner.push([x, y]);
      }
    }
    if (colliner.length) {
      for (let [a, b] of colliner) {
        used.add(a + "," + b);
      }
      out = [...out, ...colliner];
    }
    previousPoint = curPoint;
  }

  return out;
}
