/**
Global and Local Inversions
We have some permutation A of [0, 1, ..., N - 1], where N is the length of A.

The number of (global) inversions is the number of i < j with 0 <= i < j < N and A[i] > A[j].

The number of local inversions is the number of i with 0 <= i < N and A[i] > A[i+1].

Return true if and only if the number of global inversions is equal to the number of local inversions.

Example 1:

Input: A = [1,0,2]
Output: true
Explanation: There is 1 global inversion, and 1 local inversion.
Example 2:

Input: A = [1,2,0]
Output: false
Explanation: There are 2 global inversions, and 1 local inversion.
Note:

A will be a permutation of [0, 1, ..., A.length - 1].
A will have length in range [1, 5000].
The time limit for this problem has been reduced.
 */
function isIdealPermutation(A: number[], c: any = []): boolean {
  let currentMax = A[0];
  let isValid = true;
  for (let i = 0; isValid && i < A.length - 2; i++) {
    currentMax = Math.max(currentMax, A[i]);
    isValid = currentMax <= A[i + 2];
  }
  return isValid;
}
function isIdealPermutation_(A: number[], c: any = []): boolean {
  for (let i = 0; i < A.length; i++) {
    if (i % 2 == 0) {
      if (A[i] < i) {
        // console.log(i, A[i]);
        return false;
      }
    } else if (A[i] > i + 1) {
      //   console.log(i, A[i]);
      return false;
    }
    // const possibleVal = i + (i % 2 == 0 ? 1 : -1);
    // if (A[i] > possibleVal) {
    //   console.log(i, A[i],  A[i]);
    //   //   return false;
    // }
  }
  return true;
}
isIdealPermutation([1, 0, 2, 4, 3], [0, 1, 2, 3, 4]);
