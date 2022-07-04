/**
Generate Random Point in a Circle
Given the radius and x-y positions of the center of a circle, write a function randPoint which generates a uniform random point in the circle.

Note:

input and output values are in floating-point.
radius and x-y position of the center of the circle is passed into the class constructor.
a point on the circumference of the circle is considered to be in the circle.
randPoint returns a size 2 array containing x-position and y-position of the random point, in that order.
Example 1:

Input: 
["Solution","randPoint","randPoint","randPoint"]
[[1,0,0],[],[],[]]
Output: [null,[-0.72939,-0.65505],[-0.78502,-0.28626],[-0.83119,-0.19803]]
Example 2:

Input: 
["Solution","randPoint","randPoint","randPoint"]
[[10,5,-7.5],[],[],[]]
Output: [null,[11.52438,-8.33273],[2.46992,-16.21705],[11.13430,-12.42337]]
Explanation of Input Syntax:

The input is two lists: the subroutines called and their arguments. Solution's constructor has three arguments, 
the radius, x-position of the center, and y-position of the center of the circle. 
randPoint has no arguments. Arguments are always wrapped with a list, even if there aren't any.
 */

/**
 * Not Accepted but viable solution, possibily due to non inclusion of circumfrance point.
 */
{
  class Solution {
    constructor(private radius: number, private x_center: number, private y_center: number) {}

    randPoint(): number[] {
      const angle = Math.floor(this.getRandBetween(0, 360));
      const distance = this.randomFloat(0, this.radius);
      const x = this.x_center + distance * Math.cos(this.getDegreeToNumber(angle));
      const y = this.y_center + distance * Math.sin(this.getDegreeToNumber(angle));
      return [x, y];
    }
    private getDegreeToNumber = (deg: number) => (deg * Math.PI) / 180;
    private getRandBetween(n1: number, n2: number) {
      const diff = Math.abs(Math.abs(n1) - Math.abs(n2));
      const random = Math.random() * diff;
      return Math.min(n1, n2) + random;
    }
    private randomFloat(minInclusive: number, maxInclusive: number, precision: number = 0.0000001) {
      const n1 = maxInclusive / precision;
      const n2 = minInclusive / precision;
      const diff = Math.abs(Math.abs(n1) - Math.abs(n2));
      const random = Math.random() * diff + 1;
      return random * precision;
    }

    //Testing functions.
    private distanceBwtween(pt1: number[], pt2: number[]) {
      return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
    }
    distanceFromCenter() {
      return this.distanceBwtween([this.x_center, this.y_center], this.randPoint());
    }
  }

  /**
   * Your Solution object will be instantiated and called as such:
   * var obj = new Solution(radius, x_center, y_center)
   * var param_1 = obj.randPoint()
   */
  const obj = new Solution(0.01, -73839.1, -3289891.3);
  const param_1 = obj.randPoint();
  console.log(param_1);

  // const distance = [];
  // for (let i = 0; i < 1000; i++) {
  //   distance.push(obj.distanceFromCenter());
  // }
  // console.log("Max: ", Math.max(...distance));
  // console.log("Min: ", Math.min(...distance));
  // console.log(distance);
}
