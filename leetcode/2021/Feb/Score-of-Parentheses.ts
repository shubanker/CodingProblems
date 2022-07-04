/**
Score of Parentheses
Given a balanced parentheses string S,
compute the score of the string based on the following rule:

() has score 1
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.
 

Example 1:

Input: "()"
Output: 1
Example 2:

Input: "(())"
Output: 2
Example 3:

Input: "()()"
Output: 2
Example 4:

Input: "(()(()))"
Output: 6
 

Note:

S is a balanced parentheses string, containing only ( and ).
2 <= S.length <= 50
 */
class ParanNode {
  value = 1;
  children: ParanNode[] = [];
}
function scoreOfParentheses(S: string): number {
  const paranRoot = new ParanNode();
  paranRoot.value = 0;
  const paranStack: ParanNode[] = [paranRoot];

  let current: ParanNode = paranRoot;
  //Converting into a tree.
  for (let i = 0; i < S.length; i++) {
    const char = S[i];
    if (char === "(") {
      const newChild = new ParanNode();
      current.children.push(newChild);
      paranStack.push(current);
      current = newChild;
    } else {
      current = paranStack.pop();
    }
  }
  genParenSum(paranRoot);
  return paranRoot.value / 2;
}
const genParenSum = (node: ParanNode) => {
  let sum = 0;
  node.children.forEach((n) => {
    genParenSum(n);
    sum += n.value;
  });
  node.value = sum * 2 || node.value;
};

//Shorter/Better solution.
function scoreOfParentheses_(S: string): number {
  const stack = [0];
  for (let i = 0; i < S.length; i++) {
    if (S[i] === "(") {
      stack.push(0);
    } else {
      const tem = stack.pop();
      const sibling = stack.pop();
      stack.push((2 * tem || 1) + sibling);
    }
  }
  return stack.pop();
}
