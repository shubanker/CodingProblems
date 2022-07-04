/**
Concatenation of Consecutive Binary Numbers
Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 109 + 7.

 

Example 1:

Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 
Example 2:

Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.
Example 3:

Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".
The decimal value of that is 118505380540.
After modulo 109 + 7, the result is 505379714.
 

Constraints:

1 <= n <= 105
 */

//with memoising for multiple testCases
const memoised = [0];
function concatenatedBinary(n: number): number {
  if (memoised[n]) {
    return memoised[n];
  }
  const mod = Math.pow(10, 9) + 7;
  let op = memoised[memoised.length - 1];
  for (let i = memoised.length; i <= n; i++) {
    let tem = i;
    do {
      op <<= 1;
      op %= mod;
    } while ((tem >>= 1));
    op += i;
    op %= mod;
    memoised[i] = op;
  }
  return op;
}

//Optimal Approach
function concatenatedBinary_(n: number): number {
  const mod = Math.pow(10, 9) + 7;
  let op = 0;
  for (let i = 1; i <= n; i++) {
    let tem = i;
    do {
      op <<= 1;
      op %= mod;
    } while ((tem >>= 1));
    op += i;
    op %= mod;
  }
  return op;
}

function concatenatedBinary2(n: number): number {
  const mod = Math.pow(10, 9) + 7;
  let op = 0;
  for (let i = 1; i <= n; i++) {
    const binary: string = i.toString(2);
    for (let c = 0; c < binary.length; c++) {
      op = (((op * 2) % mod) + +binary.charAt(c)) % mod;
    }
  }
  return op;
}
