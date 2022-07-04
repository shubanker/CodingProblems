/**
Complex Number Multiplication
A complex number can be represented as a string on the form "real+imaginaryi" where:

real is the real part and is an integer in the range [-100, 100].
imaginary is the imaginary part and is an integer in the range [-100, 100].
i2 == -1.
Given two complex numbers num1 and num2 as strings, return a string of the complex number that represents their multiplications.

 

Example 1:

Input: num1 = "1+1i", num2 = "1+1i"
Output: "0+2i"
Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
Example 2:

Input: num1 = "1+-1i", num2 = "1+-1i"
Output: "0+-2i"
Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
 

Constraints:

num1 and num2 are valid complex numbers.
 */
function complexNumberMultiply(num1: string, num2: string): string {
  let n1 = num1.split("+");
  let n2 = num2.split("+");
  var exp1 = [+n2[0] * +n1[0], +n2[0] * +n1[1].slice(0, n1[1].length - 1)];
  var exp2 = [
    +n2[1].slice(0, n2[1].length - 1) * +n1[0],
    +n2[1].slice(0, n2[1].length - 1) * +n1[1].slice(0, n1[1].length - 1),
  ];
  return (exp1[0] - exp2[1]).toString() + "+" + (exp1[1] + exp2[0]).toString() + "i";
}
