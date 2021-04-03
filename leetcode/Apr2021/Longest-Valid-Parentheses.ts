/**
Longest Valid Parentheses
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

 

Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
 */
function longestValidParentheses(s: string): number {
  const stack = [];
  let max = 0;
  let count = 0;
  let i = 0;
  let start = -1;
  for (; i < s.length; i++) {
    count++;
    if (s[i] === "(") {
      stack.push(i);
    } else {
      if (stack.length) {
        stack.pop();
      } else {
        max = Math.max(max, count - 1);
        count = 0;
        stack.length = 0;
        start = i;
      }
    }
  }
  if (stack.length) {
    stack.unshift(start);
    stack.push(i);
    for (let j = 0; j < stack.length - 1; j++) {
      max = Math.max(max, stack[j + 1] - stack[j] - 1);
    }
    return max;
  }
  return Math.max(max, count);
}

//alternate approach
function longestValidParentheses_(s: string): number {
  let stack = [-1],
    maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length) {
        maxLength = maxLength < i - stack[stack.length - 1] ? i - stack[stack.length - 1] : maxLength;
      } else {
        stack.push(i);
      }
    }
  }
  return maxLength;
}
console.log(longestValidParentheses("(())("));
console.log(longestValidParentheses(")()((()()())())((()"));
console.log(longestValidParentheses("(()"));
console.log(longestValidParentheses(")(((((()())()()))()(()))(")); //22
