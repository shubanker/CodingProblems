import { runTests } from "../../test";

/**
Decode Ways
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

The answer is guaranteed to fit in a 32-bit integer.

 

Example 1:

Input: s = "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
Example 3:

Input: s = "0"
Output: 0
Explanation: There is no character that is mapped to a number starting with '0'. We cannot ignore a zero when we face it while decoding. So, each '0' should be part of "10" --> 'J' or "20" --> 'T'.
Example 4:

Input: s = "1"
Output: 1
 

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
 */
function numDecodings(s: string): number {
  if (s.length == 0 || s.charAt(0) == "0") return 0;
  let ans = 1;
  let oneStepBack = 1,
    twoStepsBack = 1;

  for (let i = 1; i < s.length; i++) {
    ans = 0;
    if (s.charAt(i) > "0") {
      ans = oneStepBack;
    }

    const str = s.slice(i - 1, i + 1);
    let getChars = +str;

    if (getChars < 27 && s.charAt(i - 1) != "0") {
      ans += twoStepsBack;
    }

    twoStepsBack = oneStepBack;
    oneStepBack = ans;
  }
  return ans;
}
console.log(numDecodings("226"));
// console.log(numDecodings("1"));
// console.log(numDecodings("0"));
console.log(
  runTests(
    [
      { arguments: ["226"], output: 3 },
      { arguments: ["2026"], output: 2 },
      { arguments: ["1"], output: 1 },
      { arguments: ["0"], output: 0 },
      { arguments: ["2635201023"], output: 4 },
      { arguments: ["26352010212"], output: 6 },
      { arguments: ["10"], output: 1 },
    ],
    numDecodings
  )
);
