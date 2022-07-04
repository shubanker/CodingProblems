/**
Matchsticks to Square
You are given an integer array matchsticks where matchsticks[i] is the length of the ith matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

Return true if you can make this square and false otherwise.

 

Example 1:


Input: matchsticks = [1,1,2,2,2]
Output: true
Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.
Example 2:

Input: matchsticks = [3,3,3,3,4]
Output: false
Explanation: You cannot find a way to form a square with all the matchsticks.
 

Constraints:

1 <= matchsticks.length <= 15
0 <= matchsticks[i] <= 109
 */
function makesquare(matchsticks: number[]): boolean {
  const sideLen = matchsticks.reduce((a, b) => a + b) / 4;
  if (sideLen !== ~~sideLen) {
    return false;
  }
  const memo = new Set();
  const partition = (id: number, sum: number, count: number) => {
    if (count == 3) {
      return true;
    }
    const key = matchsticks.join(",");
    if (memo.has(key) || sum > sideLen) {
      return false;
    }
    if (sum === sideLen) {
      return partition(0, 0, count + 1);
    }
    for (let i = id; i < matchsticks.length; i++) {
      if (matchsticks[i] === null) {
        continue;
      }
      const num = matchsticks[i];
      matchsticks[i] = null;
      if (partition(i + 1, sum + num, count)) {
        return true;
      }
      matchsticks[i] = num;
    }
    memo.add(key);
    return false;
  };
  return partition(0, 0, 0);
}
console.log(makesquare([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3]));
