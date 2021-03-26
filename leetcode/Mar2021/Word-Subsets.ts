/**
Word Subsets
We are given two arrays A and B of words.  Each word is a string of lowercase letters.

Now, say that word b is a subset of word a if every letter in b occurs in a, including multiplicity.  For example, "wrr" is a subset of "warrior", but is not a subset of "world".

Now say a word a from A is universal if for every b in B, b is a subset of a. 

Return a list of all universal words in A.  You can return the words in any order.

 

Example 1:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","o"]
Output: ["facebook","google","leetcode"]
Example 2:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["l","e"]
Output: ["apple","google","leetcode"]
Example 3:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","oo"]
Output: ["facebook","google"]
Example 4:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["lo","eo"]
Output: ["google","leetcode"]
Example 5:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["ec","oc","ceo"]
Output: ["facebook","leetcode"]
 

Note:

1 <= A.length, B.length <= 10000
1 <= A[i].length, B[i].length <= 10
A[i] and B[i] consist only of lowercase letters.
All words in A[i] are unique: there isn't i != j with A[i] == A[j].
 */
function wordSubsets(A: string[], B: string[]): string[] {
  const Amap = A.map(wordToMap);
  const Bmap = B.reduce((a, word) => {
    const newMap = wordToMap(word);
    for (const [key, val] of newMap) {
      a.set(key, Math.max(a.get(key) ?? 0, val));
    }
    return a;
  }, new Map<string, number>());
  const op: string[] = [];

  Amap.forEach((a, i) => {
    for (const [key, val] of Bmap) {
      if ((a.get(key) ?? -1) < val) {
        return false;
      }
    }
    op.push(A[i]);
  });
  return op;
}
const wordToMap = (str: string) => {
  const map = new Map<string, number>();
  for (let i = 0; i < str.length; i++) {
    map.set(str[i], (map.get(str[i]) ?? 0) + 1);
  }
  return map;
};
console.log(wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["e", "o"]));
