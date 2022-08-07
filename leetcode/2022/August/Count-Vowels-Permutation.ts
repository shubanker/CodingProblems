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
{
  const followUpChars = {
    a: ["e"],
    e: ["a", "i"],
    i: ["a", "e", "o", "u"],
    o: ["i", "u"],
    u: ["a"],
  };
  const followUpCharsKeys = Object.keys(followUpChars);
  const vovelPermMemo: Record<string, number[]> = followUpCharsKeys.reduce((m, c) => {
    m[c] = [0, 1];
    return m;
  }, {});
  const followUpMod = 10 ** 9 + 7;
  function countVowelPermutation(n: number): number {
    for (let i = vovelPermMemo.a.length; i <= n; i++) {
      followUpCharsKeys.forEach((char) => {
        const nextCount = followUpChars[char].reduce((sum: number, c: string) => {
          return sum + vovelPermMemo[c][i - 1];
        }, 0);
        vovelPermMemo[char].push(nextCount % followUpMod);
      });
    }
    return (
      followUpCharsKeys.reduce((sum, char) => {
        return sum + vovelPermMemo[char][n];
      }, 0) % followUpMod
    );
  }
}
