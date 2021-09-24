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
//TODO: scrap and re-try, memo wont word because using DFS, either switch to BFS or dont use memo.
function findWords(board: string[][], words: string[]): string[] {
  const memoMap = new Map<string, string[]>();
  const found: string[] = [];
  board.forEach((row, i) => {
    row.forEach((char, j) => {
      pushToMemo(memoMap, char, positionToKey(i, j));
    });
  });
  words.forEach((word) => {
    let endIndex = word.length - 1;
    while (!memoMap.has(word.substr(0, endIndex))) {
      endIndex--;
    }
    if (endIndex > 1) {
      endIndex--;
    }
    const startings = memoMap.get(word.substr(0, endIndex));
    for (let index = 0; index < startings.length; index++) {
      const [i, j] = startings[index].split(",").map((c) => +c);
      if (checkForWord(board, word, 1, i, j, memoMap)) {
        found.push(word);
      }
    }
  });
  return found;
}
const ws2Neighbours = [
  [0, -1],
  [0, 1],
  [1, 0],
  [-1, 0],
];
const checkForWord = (
  board: string[][],
  word: string,
  start: number,
  i: number,
  j: number,
  memo: Map<string, string[]>
) => {
  if (start == word.length) {
    return true;
  }
  const char = word.charAt(start);
  return ws2Neighbours.forEach((cord) => {
    const ni = i + cord[0];
    const nj = j + cord[1];
    if (board[ni]?.[nj] && board[ni][nj] === char) {
      pushToMemo(memo, word.substr(0, start + 1), positionToKey(ni, nj));
      if (checkForWord(board, word, start + 1, nj, nj, memo)) {
        return true;
      }
    }
  });
};
const pushToMemo = (map: Map<string, string[]>, char: string, value: string) => {
  if (!map.has(char)) {
    map.set(char, []);
  }
  map.get(char).push(value);
};
const positionToKey = (i: any, j: any) => `${i},${j}`;
