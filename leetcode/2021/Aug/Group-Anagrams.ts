/**
Group Anagrams
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Example 2:

Input: strs = [""]
Output: [[""]]
Example 3:

Input: strs = ["a"]
Output: [["a"]]
 

Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lower-case English letters.
 */
function groupAnagrams(strs: string[]): string[][] {
  let map = new Map();
  for (let s of strs) {
    let key = s.split("").sort().join("");
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(s);
  }
  return Array.from(map.values());
}
//This approach is slower apparently.
function groupAnagrams_(strs: string[]): string[][] {
  let map = new Map();
  const strMap = new Map();
  const getKey = (str: string) => {
    strMap.clear();
    const startChar = "a".charCodeAt(0);
    for (let i = 0; i < str.length; i++) {
      let ch = str[i];
      if (!strMap.has(ch)) {
        strMap.set(ch, 1);
      } else {
        strMap.set(ch, strMap.get(ch) + 1);
      }
    }

    let key = "";
    for (let index = 0; index < 26; index++) {
      const char = String.fromCharCode(startChar + index);
      if (strMap.has(char)) {
        key += char + strMap.get(char);
      }
    }
    return key;
  };
  for (let s of strs) {
    const key = getKey(s);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(s);
  }
  return Array.from(map.values());
}
