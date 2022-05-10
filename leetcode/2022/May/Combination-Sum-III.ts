/**
Combination Sum III
Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

Only numbers 1 through 9 are used.
Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

 

Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
Example 2:

Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.
Example 3:

Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
 

Constraints:

2 <= k <= 9
1 <= n <= 60
 */
function combinationSum3(k: number, n: number): number[][] {
  const usedNums = new Set<number>();
  const identifiedSeq = new Set<string>();
  const backTrack = (k: number, currentSum: number, remainingSum: number) => {
    if (k == 0 && remainingSum == 0) {
      identifiedSeq.add([...usedNums].sort().join());
    }
    if (k == 0 || remainingSum < 0) {
      return;
    }
    for (let i = 9; i > 0; i--) {
      if (!usedNums.has(i)) {
        usedNums.add(i);
        backTrack(k - 1, currentSum + i, remainingSum - i);
        usedNums.delete(i);
      }
    }
  };
  backTrack(k, 0, n);
  return [...identifiedSeq].map((str) => str.split(",").map((num) => +num));
}
console.log(combinationSum3(3, 9));
