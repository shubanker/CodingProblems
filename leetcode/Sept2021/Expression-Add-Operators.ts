/**
Expression Add Operators
Given a string num that contains only digits and an integer target, return all possibilities to add the binary operators '+', '-', or '*' between the digits of num so that the resultant expression evaluates to the target value.

 

Example 1:

Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
Example 2:

Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
Example 3:

Input: num = "105", target = 5
Output: ["1*0+5","10-5"]
Example 4:

Input: num = "00", target = 0
Output: ["0*0","0+0","0-0"]
Example 5:

Input: num = "3456237490", target = 9191
Output: []
 

Constraints:

1 <= num.length <= 10
num consists of only digits.
-2^31 <= target <= 2^31 - 1
 */
function addOperators(num: string, target: number): string[] {
  const op: string[] = [];
  const backTrack = (str: string, ar: any[], total: number, prev: number) => {
    if (!str && total == target) {
      op.push(ar.join(""));
    }
    let length = str[0] == "0" ? 1 : str.length;
    for (let i = 1; i <= length; i++) {
      const curr = +str.substr(0, i);
      const remaining = str.substr(i);
      if (!ar.length) {
        backTrack(remaining, [curr], curr, curr);
      } else {
        backTrack(remaining, [...ar, "+", curr], total + curr, curr);
        backTrack(remaining, [...ar, "-", curr], total - curr, -curr);
        const product = curr * prev;
        backTrack(remaining, [...ar, "*", curr], total + product - prev, product);
      }
    }
  };
  backTrack(num, [], 0, 0);
  return op;
}
