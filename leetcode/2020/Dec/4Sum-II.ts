/**
4Sum II
Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.

To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.

Example:

Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

Output:
2

Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
 */
{
  const fourSumCount = (A: number[], B: number[], C: number[], D: number[]) => {
    const map = new Map<number, number>();
    A.forEach((n) => {
      B.forEach((m) => {
        map.set(n + m, (map.get(n + m) || 0) + 1);
      });
    });
    let count = 0;
    C.forEach((n) => {
      D.forEach((m) => {
        count += map.get(-n - m) || 0;
      });
    });
    return count;
  };
  const fourSumCountNative = (A: number[], B: number[], C: number[], D: number[]) => {
    const map = new Map<number, number>();
    const length = A.length;
    let tem: number;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        tem = A[i] + B[j];
        map.set(tem, (map.get(tem) || 0) + 1);
      }
    }
    let count = 0;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        count += map.get(-C[i] - D[j]) || 0;
      }
    }
    return count;
  };
}
{
  //Approach 2
  const fourSumCount = (A: number[], B: number[], C: number[], D: number[]) => {
    return twoSumCount(mergeAndSumArray(A, B), mergeAndSumArray(C, D));
  };
  const mergeAndSumArray = (a: number[], b: number[]) => {
    const ar = [];
    a.forEach((n) => {
      b.forEach((n2) => {
        ar.push(n + n2);
      });
    });
    return ar;
  };

  const twoSumCount = (a: number[], b: number[]) => {
    let count = 0;
    a.forEach((n) => {
      b.forEach((n1) => {
        n + n1 || count++;
      });
    });
    return count;
  };
}
