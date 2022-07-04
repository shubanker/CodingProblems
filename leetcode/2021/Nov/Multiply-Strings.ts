/**
Multiply Strings
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
 */
function multiply(num1: string, num2: string): string {
  if (!+num1 || !+num2) return "0";
  const prod = Array(num1.length + num2.length).fill(0);
  let currIdx = prod.length - 1;

  for (let i = num1.length - 1; i >= 0; i--) {
    let idx = currIdx--;

    for (let j = num2.length - 1; j >= 0; j--) {
      const res = +num1[i] * +num2[j] + prod[idx];
      prod[idx] = res % 10;
      prod[--idx] += Math.floor(res / 10);
    }
  }
  return prod.join("").replace(/^0+/, "");
}
