/**
Longest String Chain
Given a list of words, each word consists of English lowercase letters.

Let's say word1 is a predecessor of word2 if and only if we can add exactly one letter anywhere in word1 to make it equal to word2. For example, "abc" is a predecessor of "abac".

A word chain is a sequence of words [word_1, word_2, ..., word_k] with k >= 1, where word_1 is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.

Return the longest possible length of a word chain with words chosen from the given list of words.

 

Example 1:

Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chain is "a","ba","bda","bdca".
Example 2:

Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of English lowercase letters.
 */
function longestStrChain(words: string[]): number {
  const wordsSets = Array(17)
    .fill(0)
    .map(() => new Set<string>());
  words.forEach((word) => {
    wordsSets[word.length].add(word);
  });
  const DP = new Map<string, number>();
  let best = 1;
  for (let i = 16; i > 0; i--) {
    if (!wordsSets[i].size) {
      continue;
    }
    for (const word of wordsSets[i]) {
      let wordVal = DP.get(word) ?? 1;
      for (let j = 0; j < word.length; j++) {
        const smallStr = word.slice(0, j) + word.slice(j + 1);
        if (wordsSets[i - 1].has(smallStr) && wordVal >= (DP.get(smallStr) ?? 1)) {
          DP.set(smallStr, wordVal + 1);
          best = Math.max(best, wordVal + 1);
        }
      }
    }
  }
  return best;
}
console.log(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"]));
