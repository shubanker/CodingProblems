/**
7. Reverse Integer
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1
 */
function reverse(x: number): number {
  let num = 0;
  const max = 2 ** 31 - 1,
    min = -1 * 2 ** 31;
  while (x && num < max && num > min) {
    num *= 10;
    num += x % 10;
    x = (x / 10) | 0;
  }
  return num < max && num > min ? num : 0;
}
