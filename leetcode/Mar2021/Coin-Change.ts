/**
Coin Change
You are given coins of different denominations and a total amount of money amount. 
Write a function to compute the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

 

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
Example 4:

Input: coins = [1], amount = 1
Output: 1
Example 5:

Input: coins = [1], amount = 2
Output: 2
 

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
 */
function coinChange(coins: number[], amount: number): number {
  const ar = Array(amount + 1).fill(amount + 1);
  ar[0] = 0;
  coins.forEach((coin) => {
    for (let i = coin; i <= amount; i++) {
      ar[i] = Math.min(ar[i], ar[i - coin] + 1);
    }
  });
  return ar[amount] <= amount ? ar[amount] : -1;
}

//Approach 2 faster
let res: number;
function coinChange2(coins: number[], amount: number) {
  coins.sort((a, b) => a - b);
  res = Number.MAX_SAFE_INTEGER;
  dfs(coins, coins.length - 1, amount, 0);
  return res == Number.MAX_SAFE_INTEGER ? -1 : res;
}
function dfs(coins: number[], i: number, amount: number, count: number) {
  if (i < 0) {
    return;
  }
  if (amount % coins[i] == 0) {
    res = Math.min(res, count + Math.floor(amount / coins[i]));
    return;
  }
  for (let c = Math.floor(amount / coins[i]); c >= 0 && count + c + 1 < res; c--) {
    dfs(coins, i - 1, amount - c * coins[i], count + c);
  }
}
console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([1, 4, 5, 3], 8));
