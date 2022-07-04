/**
Maximum Length of a Concatenated String with Unique Characters
Given an array of strings arr. String s is a concatenation of a sub-sequence of arr which have unique characters.

Return the maximum possible length of s.

 

Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".
Maximum length is 4.
Example 2:

Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible solutions are "chaers" and "acters".
Example 3:

Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
 

Constraints:

1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lower case English letters.
 */
function maxLength(arr: string[]): number {
  const set = arr.map((c) => new Set(c));
  const DP: number[][] = Array(arr.length)
    .fill(0)
    .map(() => Array(arr.length).fill(0));
  DP[0][0] = arr[0].length;
  const isNonColiding = (str: string, set: Set<string>) => {
    const strSet = new Set(str);
    for (let char of strSet) {
      if (set.has(char)) {
        return false;
      }
    }
    return true;
  };
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j <= i; j++) {}
  }
  return 0;
}
