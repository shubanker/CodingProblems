/**
Check If Two String Arrays are Equivalent

Solution
Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.

A string is represented by an array if the array elements concatenated in order forms the string.

 

Example 1:

Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
Explanation:
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.
Example 2:

Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
Output: false
Example 3:

Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
Output: true
 

Constraints:

1 <= word1.length, word2.length <= 103
1 <= word1[i].length, word2[i].length <= 103
1 <= sum(word1[i].length), sum(word2[i].length) <= 103
word1[i] and word2[i] consist of lowercase letters.
 */
function arrayStringsAreEqual(word1: string[], word2: string[]): boolean {
  let w2Index = 0,
    w2CharIndex = 0;

  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word1[i].length; j++) {
      if (word1[i][j] !== word2[w2Index][w2CharIndex]) {
        return false;
      }
      if (w2CharIndex === word2[w2Index].length - 1) {
        w2Index++;

        if (w2Index === word2.length) {
          return i === word1.length - 1 && j === word1[i].length - 1 && word2[w2Index - 1].length - 1 === w2CharIndex;
        }
        w2CharIndex = 0;
      } else {
        w2CharIndex++;
      }
    }
  }
  return word2.length === w2Index - 1 && word2[w2Index - 1].length - 1 === w2CharIndex;
}
function arrayStringsAreEqual2(word1: string[], word2: string[]): boolean {
  return word1.join("") == word2.join("");
}
console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bcd"]));
