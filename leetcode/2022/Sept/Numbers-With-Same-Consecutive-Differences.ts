/**
Numbers With Same Consecutive Differences
Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.

Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.

You may return the answer in any order.

 

Example 1:

Input: n = 3, k = 7
Output: [181,292,707,818,929]
Explanation: Note that 070 is not a valid number, because it has leading zeroes.
Example 2:

Input: n = 2, k = 1
Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
 

Constraints:

2 <= n <= 9
0 <= k <= 9
 */
function numsSameConsecDiff(n: number, k: number): number[] {
  const combos = {};
  for (let index = 0; index < 10; index++) {
    combos[index] = [];
    if (index - k >= 0) {
      combos[index].push(index - k);
    }
    if (index + k < 10) {
      combos[index].push(index + k);
    }
  }
  let length = 1,
    numbersSet = new Set(
      Array(9)
        .fill(0)
        .map((_, i) => i + 1)
    );
  while (length < n) {
    let nextNumbers = new Set<number>();
    numbersSet.forEach((num) => {
      combos[num % 10]?.forEach((nextNum: number) => {
        nextNumbers.add(num * 10 + nextNum);
      });
    });
    numbersSet = nextNumbers;
    length++;
  }
  return [...numbersSet];
}
console.log(numsSameConsecDiff(3, 7));
