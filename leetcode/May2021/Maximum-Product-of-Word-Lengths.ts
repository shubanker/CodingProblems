/**
Maximum Product of Word Lengths
Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.

 

Example 1:

Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".
Example 2:

Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: The two words can be "ab", "cd".
Example 3:

Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: No such pair of words.
 

Constraints:

2 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] consists only of lowercase English letters.
 */
function maxProduct(words: string[]): number {
  const mask = words.map((word) => {
    let current = 0;
    for (let i = 0; i < word.length; i++) {
      current |= 1 << (word.charCodeAt(i) - 97);
    }
    return current;
  });
  let max = 0;
  for (let i = 0; i < mask.length - 1; i++) {
    for (let j = i + 1; j < mask.length; j++) {
      if ((mask[i] & mask[j]) === 0) {
        max = Math.max(max, words[i].length * words[j].length);
      }
    }
  }
  return max;
}
function maxProduct_Set(words: string[]): number {
  const mappedWords = words.map((w) => ({ len: w.length, set: new Set(w) }));
  let max = 0;
  const isDistinct = (s1: Set<string>, s2: Set<string>) => {
    if (s1.size > s2.size) {
      [s1, s2] = [s2, s1]; //swapping to make s1 having least number of chars.
    }
    for (const char of s1) {
      if (s2.has(char)) {
        return false;
      }
    }
    return true;
  };
  mappedWords.forEach((w, i) => {
    for (let j = i + 1; j < mappedWords.length; j++) {
      const w2 = mappedWords[j];
      const product = w.len * w2.len;
      if (product > max && isDistinct(w.set, w2.set)) {
        max = product;
      }
    }
  });
  return max;
}
