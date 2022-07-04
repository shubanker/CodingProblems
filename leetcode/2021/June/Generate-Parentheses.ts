/**
Generate Parentheses
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 */

//Incorrect sol.
const generateParenthesisMemo = new Map<number, string[]>();
generateParenthesisMemo.set(1, ["()"]);
function generateParenthesis(n: number): string[] {
  if (n < 1) {
    return [];
  }
  if (!generateParenthesisMemo.has(n)) {
    const previous = generateParenthesis(n - 1);
    const op = [];
    previous.forEach((set) => {
      op.push(`(${set})`);
      op.push(`()${set}`);
      op.push(`${set}()`);
    });
    op.pop();
    generateParenthesisMemo.set(n, op);
  }
  return generateParenthesisMemo.get(n);
}
const generateParenthesisMemo2 = new Map<string, string[]>();
const gen = (o: number, c: number) => {
  if (o > c) return [];
  if (!generateParenthesisMemo2.has(`${o},${c}`)) {
    generateParenthesisMemo2.set(
      `${o},${c}`,
      o == 0 ? [")".repeat(c)] : [...gen(o - 1, c).map((_) => "(" + _), ...gen(o, c - 1).map((_) => ")" + _)]
    );
  }
  return generateParenthesisMemo2.get(`${o},${c}`);
};
