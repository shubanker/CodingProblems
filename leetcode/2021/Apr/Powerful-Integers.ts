/**
Powerful Integers
Given three integers x, y, and bound, return a list of all the powerful integers that have a value less than or equal to bound.

An integer is powerful if it can be represented as xi + yj for some integers i >= 0 and j >= 0.

You may return the answer in any order. In your answer, each value should occur at most once.

 

Example 1:

Input: x = 2, y = 3, bound = 10
Output: [2,3,4,5,7,9,10]
Explanation:
2 = 20 + 30
3 = 21 + 30
4 = 20 + 31
5 = 21 + 31
7 = 22 + 31
9 = 23 + 30
10 = 20 + 32
Example 2:

Input: x = 3, y = 5, bound = 15
Output: [2,4,6,8,10,14]
 

Constraints:

1 <= x, y <= 100
0 <= bound <= 106
 */
function powerfulIntegers(x: number, y: number, bound: number): number[] {
  let xPow = [1];
  let yPow = [1];
  if (x > 1) {
    while (xPow[xPow.length - 1] <= bound) {
      xPow.push(xPow[xPow.length - 1] * x);
    }
    xPow.pop();
  }
  if (y > 1) {
    while (yPow[yPow.length - 1] <= bound) {
      yPow.push(yPow[yPow.length - 1] * y);
    }
    yPow.pop();
  }

  const powerfulList = new Set<number>();
  xPow.forEach((powx) => {
    for (let i = 0; i < yPow.length; i++) {
      const sum = powx + yPow[i];
      if (sum > bound) {
        break;
      }
      powerfulList.add(sum);
    }
  });
  return [...powerfulList];
}
console.log(powerfulIntegers(2, 1, 10));
console.log(powerfulIntegers(2, 3, 10));
