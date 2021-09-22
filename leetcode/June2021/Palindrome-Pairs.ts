/**
Palindrome Pairs
Given a list of unique words, return all the pairs of the distinct indices (i, j) in the given list, so that the concatenation of the two words words[i] + words[j] is a palindrome.

 

Example 1:

Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]
Example 2:

Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]
Example 3:

Input: words = ["a",""]
Output: [[0,1],[1,0]]
 

Constraints:

1 <= words.length <= 5000
0 <= words[i].length <= 300
words[i] consists of lower-case English letters.
 */
class ReverseTrai {
  private char: string;
  private next: ReverseTrai = null;
  constructor(str: string) {
    this.char = str.substr(-1);
    if (str.length > 1) {
      this.next = new ReverseTrai(str.substr(0, str.length - 1));
    }
  }
  static isPalindrom(str: string) {
    const len = str.length / 2;
    for (let i = 0; i < len; i++) {
      if (str[i] !== str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }
  static matchPalindrom(str: string, trai: ReverseTrai) {
    let iterator = trai;
    let remainingStr = "";
    let i = 0;

    //Trai is empty
    if (trai.char !== "") {
      for (; i < str.length && iterator; i++) {
        if (str.charAt(i) !== iterator.char) {
          return false;
        }
        iterator = iterator.next;
      }
    }
    remainingStr = str.substr(i);

    while (iterator) {
      remainingStr += iterator.char;
      iterator = iterator.next;
    }
    return ReverseTrai.isPalindrom(remainingStr);
  }
}
function palindromePairs(words: string[]): number[][] {
  const reverseTraiList = words.map((word) => new ReverseTrai(word));
  const op = [];
  words.forEach((word, i) => {
    reverseTraiList.forEach((trai, j) => {
      if (i !== j && ReverseTrai.matchPalindrom(word, trai)) {
        op.push([i, j]);
      }
    });
  });
  return op;
}
