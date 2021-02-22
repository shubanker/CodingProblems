/**
Longest Word in Dictionary through Deleting
Given a string and a string dictionary, 
find the longest string in the dictionary that can be formed by deleting some characters of the given string.
If there are more than one possible results,
return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

Example 1:
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output: 
"apple"
Example 2:
Input:
s = "abpcplea", d = ["a","b","c"]

Output: 
"a"
Note:
All the strings in the input will only contain lower-case letters.
The size of the dictionary won't exceed 1,000.
The length of all the strings in the input won't exceed 1,000.
 */
function findLongestWord(s: string, d: string[]): string {
  let maxString = "";
  d.forEach((str) => {
    if (str === getLargerString(maxString, str) && checkIfConvertable(s, str)) {
      maxString = str;
    }
  });
  return maxString;
}
const getLargerString = (str1: string, str2: string) => {
  if (str1.length === str2.length) {
    return str1 > str2 ? str2 : str1;
  }
  return str1.length > str2.length ? str1 : str2;
};
const checkIfConvertable = (mainString: string, str: string) => {
  let lastIndex = -1;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    lastIndex = mainString.indexOf(char, lastIndex + 1);
    if (lastIndex === -1) {
      return false;
    }
  }
  return true;
};
console.log(
  findLongestWord("aewfafwafjlwajflwajflwafj", ["apple", "ewaf", "awefawfwaf", "awef", "awefe", "ewafeffewafewf"])
);
