/**
Beautiful Arrangement
Suppose you have n integers from 1 to n. We define a beautiful arrangement as an array that is constructed by these n numbers successfully if one of the following is true for the ith position (1 <= i <= n) in this array:

The number at the ith position is divisible by i.
i is divisible by the number at the ith position.
Given an integer n, return the number of the beautiful arrangements that you can construct.

 

Example 1:

Input: n = 2
Output: 2
Explanation: 
The first beautiful arrangement is [1, 2]:
Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).
Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).
The second beautiful arrangement is [2, 1]:
Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).
Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 15
 */
function countArrangement(n: number): number {
  const indexesTaken: Record<number, boolean> = Object.create(null);
  return getArrangmentCount(n, indexesTaken, n);
}
const getArrangmentCount = (n: number, indexesTaken: Record<number, boolean>, nextNum: number) => {
  if (nextNum === 1) {
    return 1;
  }
  let count = 0;
  for (let index = 0; index < n; index++) {
    if (!indexesTaken[index]) {
      if ((index + 1) % nextNum == 0 || nextNum % (index + 1) == 0) {
        indexesTaken[index] = true;
        count += getArrangmentCount(n, indexesTaken, nextNum - 1);
        indexesTaken[index] = false;
      }
    }
  }
  return count;
};
for (let index = 1; index < 30; index++) {
  console.log(`${index} => ${countArrangement(index)}`);
}
// console.log(countArrangement(4));
// 3
// [1,2,3]
// [3,2,1]
// [2,1,3]
