import { runTests } from "../../test";

/**
Next Greater Element III
Given a positive integer n, find the smallest integer which has exactly the same digits existing in the integer n and is greater in value than n. If no such positive integer exists, return -1.

Note that the returned integer should fit in 32-bit integer, if there is a valid answer but it does not fit in 32-bit integer, return -1.

 

Example 1:

Input: n = 12
Output: 21
Example 2:

Input: n = 21
Output: -1
 

Constraints:

1 <= n <= 231 - 1
 */
function nextGreaterElement(n: number): number {
  const numArray = (n + "").split("");
  const result = findSmallestGreater(numArray, numArray.length - 2);
  // return result;
  return result < Math.pow(2, 31) - 1 ? result : -1;
}
const findSmallestGreater = (n: any[], index: number) => {
  if (index < 0) {
    return -1;
  }
  for (let i = n.length - 1; i >= index; i--) {
    for (let j = Math.min(i - 1, index); j >= index; j--) {
      if (n[i] > n[j]) {
        const t = n[i];
        n[i] = n[j];
        n[j] = t;
        const endPart = n.splice(j + 1);
        endPart.sort();
        n.push(...endPart);
        return +n.join("");
      }
    }
  }
  return findSmallestGreater(n, index - 1);
};

// console.log(nextGreaterElement(3214563));
// console.log(nextGreaterElement(1999999999));
// console.log(nextGreaterElement(21));

//Inner function.
function nextGreaterElementTest(n: number): number {
  const numArray = (n + "").split("");
  const result = findSmallestGreater(numArray, numArray.length - 2);
  return result;
}
console.log(
  runTests(
    [
      {
        arguments: [3214563],
        output: 3214635,
      },
      {
        arguments: [1999999999],
        output: 9199999999,
      },
      {
        arguments: [21],
        output: -1,
      },
    ],
    nextGreaterElementTest
  )
);
//Original Function.
console.log(
  runTests(
    [
      {
        arguments: [3214563],
        output: 3214635,
      },
      {
        arguments: [1999999999],
        output: -1,
      },
      {
        arguments: [21],
        output: -1,
      },
    ],
    nextGreaterElement
  )
);
