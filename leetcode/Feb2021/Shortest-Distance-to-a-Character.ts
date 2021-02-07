import { runTests } from "../../test";

/**
Shortest Distance to a Character
Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the shortest distance from s[i] to the character c in s.

 

Example 1:

Input: s = "loveleetcode", c = "e"
Output: [3,2,1,0,1,0,0,1,2,2,1,0]
Example 2:

Input: s = "aaab", c = "b"
Output: [3,2,1,0]
 

Constraints:

1 <= s.length <= 10^4
s[i] and c are lowercase English letters.
c occurs at least once in s.
 */
function shortestToChar(s: string, c: string): number[] {
  let lastPos = -Infinity;
  let nextPos: number;
  const setNextPos = (start = 0) => {
    nextPos = s.indexOf(c, start);
    if (nextPos === -1) {
      nextPos = Infinity;
    }
  };
  setNextPos();
  const posAr: number[] = [];
  for (let i = 0; i < s.length; i++) {
    posAr.push(Math.min(i - lastPos, nextPos - i));
    if (nextPos === i) {
      lastPos = i;
      setNextPos(i + 1);
    }
  }
  return posAr;
}

console.log(
  runTests(
    [
      {
        arguments: ["aaba", "b"],
        output: [2, 1, 0, 1],
      },
      {
        arguments: ["loveleetcode", "e"],
        output: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0],
      },
    ],
    shortestToChar,
    (a, b) => a.join(",") == b.join(",")
  )
);
