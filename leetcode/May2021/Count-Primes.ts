/**
Count Primes
Count the number of prime numbers less than a non-negative number, n.

 

Example 1:

Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
Example 2:

Input: n = 0
Output: 0
Example 3:

Input: n = 1
Output: 0
 

Constraints:

0 <= n <= 5 * 10^6
 */
const primeList = [2];
let checkedTill = 2;

function countPrimes(n: number): number {
  if (n < 2) {
    return 0;
  }
  const isPrimeNumber = (n: number) => {
    const root = Math.sqrt(n);
    for (const p of primeList) {
      if (n % p === 0) {
        return false;
      }
      if (p > root) {
        return true;
      }
    }
    return true;
  };
  if (checkedTill <= n) {
    for (let i = checkedTill + 1; i < n; i += 2) {
      if (isPrimeNumber(i)) {
        primeList.push(i);
      }
    }
    checkedTill = (n & 1) == 1 ? n - 1 : n;
    return primeList.length;
  }
  let count = 0;

  for (const prime of primeList) {
    if (prime >= n) {
      break;
    }
    count++;
  }
  return count;
}
console.log(countPrimes(5));
console.log(countPrimes(8));
