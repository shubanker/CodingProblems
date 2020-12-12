import { runTests } from "../../test";

{
  const calculateFromString = (s: string) => {
    s = (s + "").replace(/ /g, "");
    let opStak = [];
    let operations = [];
    const getPriority = (operator: string) => {
      return ["*", "/"].includes(operator) ? 2 : ["+", "-"].includes(operator) ? 1 : 0;
    };
    let lastNum = "";
    for (let i = s.length - 1; i >= 0; i--) {
      const char = s.charAt(i);
      if (isNaN(+char)) {
        //Handling if number is negative.
        if (lastNum && char == "-" && (i === 0 || isNaN(+s.charAt(i - 1)))) {
          lastNum = "" + char + lastNum;
          continue;
        }
        if (lastNum.length) {
          opStak.push(+lastNum);
        }
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
  };
  // tests
  const testCases = [
    { arguments: ["3+2*2"], output: 7 },
    { arguments: ["3*2+2"], output: 8 },
    { arguments: [32], output: 32 },
    { arguments: ["3+5 / 2 "], output: 5 },
    { arguments: ["0-2147483647"], output: -2147483647 },
    { arguments: ["-1 + (2 + 3)"], output: 4 },
    { arguments: ["-1 + (2 + -3)"], output: -2 },
    { arguments: ["-1 + (2 - -3)"], output: 4 },
  ];
  const result = runTests(testCases, calculateFromString);
  console.log(result);
}
