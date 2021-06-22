/**
Number of Matching Subsequences
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
Example 2:

Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2
 

Constraints:

1 <= s.length <= 5 * 10^4
1 <= words.length <= 5000
1 <= words[i].length <= 50
s and words[i] consist of only lowercase English letters.
 */
function numMatchingSubseq(s: string, words: string[]): number {
  let count = 0;
  words.forEach((str) => checkStringSubSeq(s, str) && count++);
  return count;
}
const checkStringSubSeq = (str: string, word: string) => {
  let strPos = 0;
  let wordPos = 0;
  while (true) {
    strPos = str.indexOf(word[wordPos], strPos);
    if (strPos !== -1) {
      wordPos++;
      strPos++;
      if (wordPos >= word.length) {
        return true;
      }
    } else {
      return false;
    }
  }
};
