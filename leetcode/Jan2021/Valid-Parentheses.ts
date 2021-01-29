/**

Valid Parentheses
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
Example 4:

Input: s = "([)]"
Output: false
Example 5:

Input: s = "{[]}"
Output: true
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
 */
{
  function isValid(s: string): boolean {
    const bracketsMap = {
      "(": ")",
      "[": "]",
      "{": "}",
    };
    const stack = [];
    return (
      s.split("").every((char) => {
        if (bracketsMap[char]) {
          stack.push(bracketsMap[char]);
          return true;
        }
        return stack.pop() === char;
      }) && !stack.length
    );
  }
}