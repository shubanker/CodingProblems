/**
Basic Calculator II
Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, +, -, *, / operators and empty spaces . The integer division should truncate toward zero.

Example 1:

Input: "3+2*2"
Output: 7
Example 2:

Input: " 3/2 "
Output: 1
Example 3:

Input: " 3+5 / 2 "
Output: 5
Note:

You may assume that the given expression is always valid.
Do not use the eval built-in library function.
 */

function calculate(s: string) {
  let opStak = [];
  let operations = [];
  const getPriority = (operator: string) => {
    return ["*", "/"].includes(operator) ? 2 : ["+", "-"].includes(operator) ? 1 : 0;
  };
  let lastNum = "";
  for (let i = s.length - 1; i >= 0; i--) {
    const char = s.charAt(i);
    if (char != " ") {
      if (isNaN(+char)) {
        opStak.push(+lastNum);
        lastNum = "";
        const priority = getPriority(char);
        while (operations.length && priority < getPriority(operations[operations.length - 1])) {
          opStak.push(operations.pop());
        }
        operations.push(char);
      } else {
        lastNum = "" + char + lastNum;
      }
    }
  }
  lastNum && opStak.push(+lastNum);
  while (operations.length) {
    opStak.push(operations.pop());
  }

  const operate = (num1: number, num2: number, operator: string) => {
    switch (operator) {
      case "*":
        return num1 * num2;
      case "/":
        return Math.floor(num1 / num2);
      case "-":
        return num1 - num2;

      default:
        return num1 + num2;
    }
  };
  operations.length = 0;
  opStak.reverse();
  while (opStak.length) {
    const lastElement = opStak.pop();
    if (["*", "/", "+", "-"].includes(lastElement)) {
      operations.push(operate(+operations.pop(), +operations.pop(), lastElement));
    } else {
      operations.push(lastElement);
    }
  }
  return operations[0] || 0;
}
{
  // tests
  const test = {
    "3+2*2": 7,
    "3*2+2": 8,
    32: 32,
    "3+5 / 2 ": 5,
    "0-2147483647": -2147483647,
  };
  let passed = 0;
  const failed: { input: string; output: string; expected: any }[] = [];
  for (const key in test) {
    const res = calculate(key);
    if (test[key] === res) {
      passed++;
    } else {
      failed.push({
        expected: test[key],
        input: key,
        output: res,
      });
    }
  }
  console.log(`${passed}/${Object.keys(test).length} cases passed`);
  failed.length &&
    failed.forEach((failure) => {
      console.log(`Input: ${failure.input}  Output: ${failure.output}\nExpected Output: ${failure.expected}`);
    });
}
