/**
Add Strings
Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

 

Example 1:

Input: num1 = "11", num2 = "123"
Output: "134"
Example 2:

Input: num1 = "456", num2 = "77"
Output: "533"
Example 3:

Input: num1 = "0", num2 = "0"
Output: "0"
 

Constraints:

1 <= num1.length, num2.length <= 104
num1 and num2 consist of only digits.
num1 and num2 don't have any leading zeros except for the zero itself.
 */
function addStrings(num1: string, num2: string): string {
  const len = Math.max(num1.length, num2.length);
  let carry = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    let sum = carry;
    sum += +(num1[num1.length - i - 1] ?? 0);
    sum += +(num2[num2.length - i - 1] ?? 0);
    res.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  if (carry) {
    res.push(carry);
  }
  return res.reverse().join("");
}
