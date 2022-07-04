import { runTests } from "../../test";

/**
Jump Game IV
Given an array of integers arr, you are initially positioned at the first index of the array.

In one step you can jump from index i to index:

i + 1 where: i + 1 < arr.length.
i - 1 where: i - 1 >= 0.
j where: arr[i] == arr[j] and i != j.
Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.

 

Example 1:

Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
Example 2:

Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You don't need to jump.
Example 3:

Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is last index of the array.
Example 4:

Input: arr = [6,1,9]
Output: 2
Example 5:

Input: arr = [11,22,7,7,7,7,7,7,7,22,13]
Output: 3
 

Constraints:

1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8
 */
function minJumps(arr: number[]): number {
  const duplicatesGraph: Record<number, number[]> = arr.reduce((accum, element, index) => {
    if (!accum[element]) {
      accum[element] = [];
    }
    accum[element].push(index);
    return accum;
  }, {});
  const visitedIndexList = new Set<number>([0]);
  const visitedValues = new Set<number>();

  let stack: number[] = [0];
  const nextStack = new Set<number>();

  for (let steps = 0; stack.length; steps++) {
    for (let i = 0; i < stack.length; i++) {
      const index = stack[i];

      const val = arr[index];
      let possibleNextSteps = [index - 1, index + 1];
      if (!visitedValues.has(val)) {
        possibleNextSteps = [...possibleNextSteps, ...duplicatesGraph[val]];
      }
      visitedValues.add(val);
      for (let j = 0; j < possibleNextSteps.length; j++) {
        const nextSteps = possibleNextSteps[j];

        if (nextSteps === arr.length - 1) {
          return steps + (index === nextSteps ? 0 : 1);
        }
        if (!visitedIndexList.has(nextSteps) && nextSteps >= 0 && nextSteps < arr.length) {
          nextStack.add(nextSteps);
        }
        visitedIndexList.add(nextSteps);
      }
    }
    stack = [...nextStack];
    nextStack.clear();
  }
}

console.log(
  runTests(
    [
      { arguments: [[100, -23, -23, 404, 100, 23, 23, 23, 3, 404]], output: 3 },
      { arguments: [[7, 6, 9, 6, 9, 6, 9, 7]], output: 1 },
      { arguments: [[11, 22, 7, 7, 7, 7, 7, 7, 7, 22, 13]], output: 3 },
      { arguments: [[11]], output: 0 },
    ],
    minJumps
  )
);
