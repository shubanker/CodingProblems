/**
Russian Doll Envelopes
You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.

Return the maximum number of envelopes can you Russian doll (i.e., put one inside the other).

Note: You cannot rotate an envelope.

 

Example 1:

Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
Example 2:

Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
 

Constraints:

1 <= envelopes.length <= 5000
envelopes[i].length == 2
1 <= wi, hi <= 104
 */
function maxEnvelopes(envelopes: number[][]): number {
  let max = 1;
  envelopes.sort((a, b) => a[0] - b[0]);
  const dp = Array(envelopes.length).fill(1);
  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  console.log(dp);
  return max;
}
function maxEnvelopes_(envelopes: number[][]): number {
  envelopes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let lastIndex = -1,
    count = 0;
  for (let i = 0; i < envelopes.length; i++) {
    if (lastIndex < 0 || (envelopes[lastIndex][0] < envelopes[i][0] && envelopes[lastIndex][1] < envelopes[i][1])) {
      count++;
      lastIndex = i;
    }
  }
  return count;
}
console.log(
  maxEnvelopes([
    [2, 100],
    [3, 200],
    [4, 300],
    [5, 500],
    [5, 400],
    [5, 250],
    [6, 370],
    [6, 360],
    [7, 380],
  ])
);
console.log(
  maxEnvelopes([
    [5, 4],
    [6, 4],
    [6, 7],
    [2, 3],
  ])
);
