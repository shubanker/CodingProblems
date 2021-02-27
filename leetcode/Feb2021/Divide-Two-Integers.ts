/**

Divide Two Integers

Solution
Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Note:

Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1]. For this problem, assume that your function returns 2^31 − 1 when the division result overflows.
 

Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.
Example 3:

Input: dividend = 0, divisor = 1
Output: 0
Example 4:

Input: dividend = 1, divisor = 1
Output: 1
 

Constraints:

-2^31 <= dividend, divisor <= 2^31 - 1
divisor != 0
 */

function divide(dividend: number, divisor: number): number {
  const isNegative = (divisor < 0 && dividend > 0) || (divisor > 0 && dividend < 0);
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  if (divisor === 0 || divisor > dividend) {
    return 0;
  }
  let div = divisor,
    count = 0,
    temcount = 1;
  while (div <= dividend) {
    if (div + div <= dividend) {
      div += div;
      temcount += temcount;
    } else {
      count += temcount;
      temcount = 1;
      dividend -= div;
      div = divisor;
    }
  }
  count += temcount - 1;
  if (isNegative) {
    return Math.max(-count, Math.pow(-2, 31));
  }
  return Math.min(count, Math.pow(2, 31) - 1);
}

//Accepted but slow (divides only 1st half, rest half is linear.)
function divide_accepted2(dividend: number, divisor: number): number {
  const isNegative = (divisor < 0 && dividend > 0) || (divisor > 0 && dividend < 0);
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  if (divisor === 0 || divisor > dividend) {
    return 0;
  }
  let div = divisor,
    count = 1;
  while (div <= dividend) {
    if (div + div <= dividend) {
      div += div;
      count += count;
    } else {
      count++;
      div += divisor;
    }
  }
  count -= 1;
  if (isNegative) {
    return Math.max(-count, Math.pow(-2, 31));
  }
  return Math.min(count, Math.pow(2, 31) - 1);
}

//In-Approperiate but accepted sol
function divide_(dividend: number, divisor: number): number {
  const div = dividend / divisor;
  const mult = div < 0 ? -1 : 1;
  const res = mult * Math.floor(div * mult);
  return Math.max(Math.min(res, Math.pow(2, 31) - 1), Math.pow(-2, 31));
}
console.log(divide(-10, -2));
