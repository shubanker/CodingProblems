/**
Basic Calculator
Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

 

Example 1:

Input: s = "1 + 1"
Output: 2
Example 2:

Input: s = " 2-1 + 2 "
Output: 3
Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
 

Constraints:

1 <= s.length <= 3 * 105
s consists of digits, '+', '-', '(', ')', and ' '.
s represents a valid expression.
'+' is not used as a unary operation.
'-' could be used as a unary operation but it has to be inside parentheses.
There will be no two consecutive operators in the input.
Every number and running calculation will fit in a signed 32-bit integer.
 */
{
  const calculate = (s: string): number => {
    s = `(${s?.replace(/ /g, "")})`; //removing space.
    let operators: string[] = [];
    const operands: number[] = [];
    let lastNum = "";
    const calc = (num1: number, num2: number, operator: String) => {
      return operator === "+" ? num1 + num2 : num2 - num1;
    };
    for (let i = 0; i < s.length; i++) {
      const char = s.charAt(i);
      if (isNaN(+char)) {
        if (lastNum.length) {
          operands.push(+lastNum);
        }
        lastNum = "";
        if (char === ")") {
          while (true) {
            const pop = operators.pop();
            if (pop === "(") {
              break;
            }
            const right = operands.pop();
            const left = operands.pop();
            operands.push(calc(left, right, pop));
          }
        } else {
          operators.push(char);
        }
      } else {
        lastNum = "" + char + lastNum;
      }
    }
    return operands.pop();
  };
  console.log(calculate(" 2-1 + 2 "));
}
