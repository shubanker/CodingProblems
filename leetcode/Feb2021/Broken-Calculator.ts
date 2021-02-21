/**
Broken Calculator
On a broken calculator that has a number showing on its display, we can perform two operations:

Double: Multiply the number on the display by 2, or;
Decrement: Subtract 1 from the number on the display.
Initially, the calculator is displaying the number X.

Return the minimum number of operations needed to display the number Y.

 

Example 1:

Input: X = 2, Y = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.
Example 2:

Input: X = 5, Y = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.
Example 3:

Input: X = 3, Y = 10
Output: 3
Explanation:  Use double, decrement and double {3 -> 6 -> 5 -> 10}.
Example 4:

Input: X = 1024, Y = 1
Output: 1023
Explanation: Use decrement operations 1023 times.
 

Note:

1 <= X <= 10^9
1 <= Y <= 10^9
 */

function brokenCalc(X: number, Y: number): number {
  let steps = 0;
  while (Y > X) {
    if (Y % 2 !== 0) {
      Y++;
    } else {
      Y /= 2;
    }
    steps++;
  }
  return steps + (X - Y);
}
//Didnt work
function brokenCalc_1(X: number, Y: number): number {
  let stack = [X];
  let minSteps = Number.MAX_SAFE_INTEGER,
    steps = 0;
  const computed = new Set<number>();

  while (minSteps >= steps) {
    const next = new Set<number>();
    for (let i = 0; i < stack.length; i++) {
      const num = stack[i];
      if (!computed.has(num)) {
        computed.add(num);
        if (num === Y) {
          minSteps = Math.min(steps, minSteps);
        } else if (num > Y) {
          minSteps = Math.min(minSteps, steps + num - Y);
        } else {
          if (num * 2 > Y) {
            next.add(num - 1);
          }
          next.add(num * 2);
        }
      }
    }
    stack = [...next].filter((c) => !computed.has(c));
    steps++;
  }
  return minSteps;
}
console.log(brokenCalc(1, 100000));
