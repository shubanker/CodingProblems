/**
Given a string of round, curly, and square open and closing brackets, return whether the brackets are balanced (well-formed).

For example, given the string "([])[]({})", you should return true.

Given the string "([)]" or "((()", you should return false.
 */

const checkBrackets = (pattern: string) => {
  const bracketsMap = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];
  return (
    pattern.split("").every((char) => {
      if (bracketsMap[char]) {
        stack.push(bracketsMap[char]);
        return true;
      }
      return stack.pop() === char;
    }) && !stack.length
  );
};

console.log(checkBrackets("([])[]({})"));
console.log(checkBrackets("([])[{}]({})"));
console.log(checkBrackets("([)]"));
console.log(checkBrackets("((()"));
