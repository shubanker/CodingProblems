/**
Word Search II
Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
 */
function findWords(board: string[][], words: string[]): string[] {
  const charStartingpoints: Record<string, number[][]> = {};
  const validWords: string[] = [];
  board.forEach((row, i) => {
    row.forEach((char, j) => {
      charStartingpoints[char] ??= [];
      charStartingpoints[char].push([i, j]);
    });
  });
  const visitedPoints = board.map((row) => row.map(() => false));
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const searchForWords = (word: string, charIndex: number, i: number, j: number) => {
    if (visitedPoints[i]?.[j] !== false || !board[i]?.[j] || board[i]?.[j] !== word[charIndex]) {
      return false;
    }
    if (charIndex === word.length - 1) {
      return true;
    }
    visitedPoints[i][j] = true;
    for (const [di, dj] of dirs) {
      if (searchForWords(word, charIndex + 1, i + di, j + dj)) {
        visitedPoints[i][j] = false;
        return true;
      }
    }
    visitedPoints[i][j] = false;
    return false;
  };
  words.forEach((word) => {
    for (const [i, j] of charStartingpoints[word[0]] ?? []) {
      if (searchForWords(word, 0, i, j)) {
        validWords.push(word);
        break;
      }
    }
  });
  return validWords;
}
console.log(
  findWords(
    [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ],
    ["oath", "pea", "eat", "rain"]
  )
);
