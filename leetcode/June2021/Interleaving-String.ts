/**
Interleaving String
Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where they are divided into non-empty substrings such that:

s = s1 + s2 + ... + sn
t = t1 + t2 + ... + tm
|n - m| <= 1
The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
Note: a + b is the concatenation of strings a and b.

 

Example 1:


Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Example 2:

Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Example 3:

Input: s1 = "", s2 = "", s3 = ""
Output: true
 

Constraints:

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.
 

Follow up: Could you solve it using only O(s2.length) additional memory space?
 */
function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s3.length !== s1.length + s2.length) {
    return false;
  }
  const memo = new Array(s1.length).fill(0).map(() => new Array(s2.length).fill(-1));
  const checkIsInter = (p1: number, p2: number, p3: number) => {
    if (p3 >= s3.length) {
      return true;
    }
    if (p1 === s1.length) {
      return s2.substring(p2) === s3.substring(p3);
    }
    if (p2 === s2.length) {
      return s1.substring(p1) === s3.substring(p3);
    }
    if (memo[p1][p2] >= 0) {
      return memo[p1][p2] === 1;
    }
    let isInter = false;
    if (s1[p1] === s3[p3]) {
      isInter = checkIsInter(p1 + 1, p2, p3 + 1);
    }
    if (!isInter && s2[p2] === s3[p3]) {
      return checkIsInter(p1, p2 + 1, p3 + 1);
    }
    memo[p1][p2] = +isInter;
    return isInter;
  };
  return checkIsInter(0, 0, 0);
}
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
