import { runTests } from "../../../test";

/**
Decoded String at Index
An encoded string S is given.  To find and write the decoded string to a tape, the encoded string is read one character at a time and the following steps are taken:

If the character read is a letter, that letter is written onto the tape.
If the character read is a digit (say d), the entire current tape is repeatedly written d-1 more times in total.
Now for some encoded string S, and an index K, find and return the K-th letter (1 indexed) in the decoded string.

 

Example 1:

Input: S = "leet2code3", K = 10
Output: "o"
Explanation: 
The decoded string is "leetleetcodeleetleetcodeleetleetcode".
The 10th letter in the string is "o".
Example 2:

Input: S = "ha22", K = 5
Output: "h"
Explanation: 
The decoded string is "hahahaha".  The 5th letter is "h".
Example 3:

Input: S = "a2345678999999999999999", K = 1
Output: "a"
Explanation: 
The decoded string is "a" repeated 8301530446056247680 times.  The 1st letter is "a".
 */

function decodeAtIndex(S: string, K: number): string {
  const stack: number[] = [];
  stack.push(isNum(S.charAt(0)) ? 0 : 1);
  for (let index = 1; index < S.length; index++) {
    const char = S.charAt(index);
    if (isNum(char)) {
      stack.push(stack[index - 1] * +char);
    } else {
      stack.push(stack[index - 1] + 1);
    }
  }
  for (let i = S.length - 1; i >= 0; i--) {
    K %= stack[i];
    if (K === 0 && !isNum(S.charAt(i))) {
      return S.charAt(i);
    }
  }
}
const isNum = (s: any) => Number.isInteger(+s);

/**
 *
 * Slow inefficient Approach.
 */
function decodeAtIndex1(S: string, K: number): string {
  let currentStr = "";
  let currentIndex = 0;
  while (K > currentStr.length) {
    const nextIntIndex = getNextSubStr(S, currentIndex);
    currentStr += S.slice(currentIndex, nextIntIndex);
    currentIndex = nextIntIndex;
    const nextIteration = +S.charAt(currentIndex++) || 1;
    currentStr = currentStr.repeat(nextIteration);
  }
  return currentStr.charAt(K - 1);
}
const getNextSubStr = (s: string, index: number) => {
  for (let i = index; i < s.length; i++) {
    if (Number.isInteger(+s.charAt(i))) {
      return i;
    }
  }
  return s.length;
};

//Tests
// console.log(decodeAtIndex("leet2code3", 10));
// console.log(decodeAtIndex("a2345678999999999999999", 1));
// console.log(decodeAtIndex("abc", 3));
// console.log(decodeAtIndex("a2b3c4d5e6f7g8h9", 9));

const testResults = runTests(
  [
    {
      arguments: ["leet2code3", 10],
      output: "o",
    },
    {
      arguments: ["a2345678999999999999999", 1],
      output: "a",
    },
    {
      arguments: ["abc", 1],
      output: "a",
    },
    {
      arguments: ["abc", 3],
      output: "c",
    },
    {
      arguments: ["a2b3c4d5e6f7g8h9", 9],
      output: "b",
    },
  ],
  decodeAtIndex
);
console.log(testResults);
