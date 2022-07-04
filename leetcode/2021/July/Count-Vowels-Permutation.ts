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
const keys = Object.keys(nextChars);
const permutationMemo: Record<string, number[]> = keys.reduce((memo, char) => {
  memo[char] = [0, 1];
  return memo;
}, {});
function countVowelPermutation(n: number): number {
  const mod = 10 ** 9 + 7;
  for (let i = permutationMemo[keys[0]].length; i <= n; i++) {
    const lastVal = new Map<string, number>();
    keys.forEach((char) => {
      lastVal.set(char, permutationMemo[char][i - 1]);
    });
    keys.forEach((char) => {
      permutationMemo[char].push(
        nextChars[char].reduce((sum, char) => {
          return sum + lastVal.get(char);
        }, 0) % mod
      );
    });
  }
  return (
    keys.reduce((sum: number, char) => {
      return sum + permutationMemo[char][n];
    }, 0) % mod
  );
}
console.log(countVowelPermutation(5));
