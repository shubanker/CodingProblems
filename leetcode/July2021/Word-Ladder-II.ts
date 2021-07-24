/**
Word Ladder II
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].

 

Example 1:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"
Example 2:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
 

Constraints:

1 <= beginWord.length <= 5
endWord.length == beginWord.length
1 <= wordList.length <= 1000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.
 */
function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
  if (!wordList.includes(endWord)) {
    return [];
  }
  const map = new Map<string, Set<string>>();
  const hasNdifferentChars = (str1: string, str2: string, difference: number = 1) => {
    if (str1.length !== str2.length) {
      return false;
    }
    let diff = 0;
    for (let i = 0; i < str1.length && diff <= difference; i++) {
      if (str1[i] !== str2[i]) {
        diff++;
      }
    }
    return diff == difference;
  };
  wordList.push(beginWord);
  //Generating list if words which can be converted in 1 step.
  for (let i = 0; i < wordList.length - 1; i++) {
    for (let j = i + 1; j < wordList.length; j++) {
      if (hasNdifferentChars(wordList[i], wordList[j])) {
        if (!map.has(wordList[i])) {
          map.set(wordList[i], new Set());
        }
        if (!map.has(wordList[j])) {
          map.set(wordList[j], new Set());
        }
        map.get(wordList[i])?.add(wordList[j]);
        map.get(wordList[j])?.add(wordList[i]);
      }
    }
  }
  wordList.pop();

  //Starting from begining word, building computing list of all possible strings at a position until destination word is found.
  const visitedStrs = new Set([beginWord]);
  const pathsStack = [visitedStrs];
  let found = false;
  while (!found) {
    const previous = pathsStack[pathsStack.length - 1];
    if (previous.size == 0) {
      return [];
    }
    const next = new Set<string>();
    previous?.forEach((str) => {
      map.get(str)?.forEach((nextStr) => {
        if (!visitedStrs.has(nextStr)) {
          next.add(nextStr);
          if (nextStr == endWord) {
            found = true;
          }
        }
      });
    });
    //If we found the end word, we add it to the list of possible strings instead of all posibilities at this point.
    if (!found) {
      pathsStack.push(next);
    } else {
      pathsStack.push(new Set([endWord]));
    }
  }

  //going in reverse and generating a map, thus eliminating strings which do not belong to path.
  const nexMap = new Map<string, Set<string>>();
  //Do reverse map.
  for (let i = pathsStack.length - 1; i > 0; i--) {
    const current = pathsStack[i];
    const previous = pathsStack[i - 1];
    current.forEach((c) => {
      map.get(c).forEach((item) => {
        if (previous.has(item)) {
          if (!nexMap.has(c)) {
            nexMap.set(c, new Set());
          }
          nexMap.get(c).add(item);
        }
      });
    });
  }
  let paths = [[endWord]];
  found = false;
  const visited = new Set([endWord]);
  while (!found) {
    const nextPaths = [];
    paths.forEach((path) => {
      const lastStr = path[path.length - 1];
      if (nexMap.has(lastStr)) {
        nexMap.get(lastStr).forEach((nextItem) => {
          if (!visited.has(nextItem)) {
            nextPaths.push([...path, nextItem]);
            if (nextItem == beginWord) {
              found = true; //Dont break just yet, need all paths of this length.
            }
          }
        });
      }
    });
    //Saving strings in a visited set so we dont go back to them.
    nextPaths.forEach((path) => visited.add(path[path.length - 1]));
    paths = nextPaths;
  }
  //Filtering out paths which ended with beginWord.
  const pathFromStart = paths.filter((p) => p[p.length - 1] === beginWord);
  pathFromStart.forEach((path) => path.reverse());
  return pathFromStart;
}
