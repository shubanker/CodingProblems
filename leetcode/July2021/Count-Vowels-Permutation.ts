/**
Count Vowels Permutation
Given an integer n, your task is to count how many strings of length n can be formed under the following rules:

Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
Each vowel 'a' may only be followed by an 'e'.
Each vowel 'e' may only be followed by an 'a' or an 'i'.
Each vowel 'i' may not be followed by another 'i'.
Each vowel 'o' may only be followed by an 'i' or a 'u'.
Each vowel 'u' may only be followed by an 'a'.
Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: n = 1
Output: 5
Explanation: All possible strings are: "a", "e", "i" , "o" and "u".
Example 2:

Input: n = 2
Output: 10
Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
Example 3: 

Input: n = 5
Output: 68
 

Constraints:

1 <= n <= 2 * 10^4
 */
const nextChars: Record<string, string[]> = {
  a: ["e"],
  e: ["a", "i"],
  i: ["a", "e", "o", "u"],
  o: ["i", "u"],
  u: ["a"],
};
function countVowelPermutation(n: number): number {
  const mod = 10 ** 9 + 7;
  const keys = Object.keys(nextChars);
  const memo: Record<string, number[]> = keys.reduce((memo, char) => {
    memo[char] = [0, 1];
    return memo;
  }, {});
  for (let i = 2; i <= n; i++) {
    keys.forEach((char) => {
      memo[char][0] = memo[char][1];
    });
    keys.forEach((char) => {
      memo[char][1] =
        nextChars[char].reduce((sum, char) => {
          return sum + memo[char][0];
        }, 0) % mod;
    });
  }
  return (
    Object.values(memo).reduce((sum: number, current: number[]) => {
      return sum + current[1];
    }, 0) % mod
  );
}
console.log(countVowelPermutation(5));
