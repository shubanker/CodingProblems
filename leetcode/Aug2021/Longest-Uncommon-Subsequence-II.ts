/**
Longest Uncommon Subsequence II
Given an array of strings strs, return the length of the longest uncommon subsequence between them. If the longest uncommon subsequence does not exist, return -1.

An uncommon subsequence between an array of strings is a string that is a subsequence of one string but not the others.

A subsequence of a string s is a string that can be obtained after deleting any number of characters from s.

For example, "abc" is a subsequence of "aebdc" because you can delete the underlined characters in "aebdc" to get "abc". Other subsequences of "aebdc" include "aebdc", "aeb", and "" (empty string).
 

Example 1:

Input: strs = ["aba","cdc","eae"]
Output: 3
Example 2:

Input: strs = ["aaa","aaa","aa"]
Output: -1
 

Constraints:

1 <= strs.length <= 50
1 <= strs[i].length <= 10
strs[i] consists of lowercase English letters.

 */
function findLUSlength(strs: string[]): number {
  let trie = { depth: 0 };
  let result = -1;
  let dfsWord = (idx, str, current) => {
    if (idx === str.length) return;
    let letter = str[idx];
    if (!current[letter]) {
      current[letter] = { depth: current.depth + 1, appears: 1 };
    } else {
      current[letter].appears++;
    }
    dfsWord(idx + 1, str, current[letter]);
    dfsWord(idx + 1, str, current);
  };
  for (let str of strs) {
    dfsWord(0, str, trie);
  }
  let current = trie;
  let dfs = (trie) => {
    if (trie.appears && trie.appears === 1) {
      result = Math.max(result, trie.depth);
    }
    for (let key in trie) {
      dfs(trie[key]);
    }
  };
  dfs(trie);
  return result;
}
