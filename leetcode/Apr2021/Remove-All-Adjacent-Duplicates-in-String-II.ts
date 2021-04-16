/**
Remove All Adjacent Duplicates in String II
Given a string s, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made.

It is guaranteed that the answer is unique.

 

Example 1:

Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.
Example 2:

Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"
Example 3:

Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"
 

Constraints:

1 <= s.length <= 10^5
2 <= k <= 10^4
s only contains lower case English letters.
 */
function removeAdjacentDuplicates(s: string, k: number): string {
  const stack: { char: string; count: number }[] = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (stack.length === 0 || stack[stack.length - 1].char !== char) {
      stack.push({ char, count: 1 });
    } else {
      stack[stack.length - 1].count++;
    }
    // if (stack[stack.length - 1].count >= k) {
    //   stack[stack.length - 1].count -= k;
    //   if (!stack[stack.length - 1].count) {
    //     stack.pop();
    //   }
    // }
  }
  while (true) {
    let didRemove = false;
    for (let i = 0; i < stack.length; i++) {
      stack[i].count %= k;
      if (!stack[i].count) {
        didRemove = true;
        if (stack[i + 1]?.char === stack[i - 1]?.char) {
          stack[i - 1].count += stack[i + 1].count;
          stack.splice(i + 1, 1);
        }
        stack.splice(i, 1);
        i--;
      }
    }
    if (!didRemove) {
      break;
    }
  }
  return stack.reduce((a, b) => {
    return a + b.char.repeat(b.count);
  }, "");
}
