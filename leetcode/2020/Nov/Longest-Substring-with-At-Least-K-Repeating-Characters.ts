/**
Longest Substring with At Least K Repeating Characters
Given a string s and an integer k, return the length of the longest substring of s such that the frequency of each character in this substring is less than or equal to k.

 

Example 1:

Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
Example 2:

Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.
 

Constraints:

1 <= s.length <= 104
s consists of only lowercase English letters.
1 <= k <= 105
 */
function longestSubstring(s: string, k: number): number {
  //   const subsetsLength = findSubsets([s], k);
  const subsetsLength = findSubsets([s], k).map((s) => s.length);
  return Math.max(0, ...subsetsLength);
}
function findSubsets(set: string[], k: number) {
  const results = [];
  set.forEach((sub) => {
    const counts: Record<string, number> = {};
    for (let index = 0; index < sub.length; index++) {
      const char = sub.charAt(index);
      if (!counts[char]) {
        counts[char] = 0;
      }
      counts[char]++;
    }
    let minRepetations;
    for (const key in counts) {
      if (!minRepetations) {
        minRepetations = key;
      } else if (counts[key] < counts[minRepetations]) {
        minRepetations = key;
      }
    }
    if (minRepetations) {
      if (counts[minRepetations] >= k) {
        results.push(sub); //sub.length
      } else {
        findSubsets(sub.split(minRepetations), k).forEach((s) => results.push(s)); //s.length
      }
    }
  });
  return results;
}
//test
console.log(findSubsets(["aaabb"], 3));
console.log(findSubsets(["ababbc"], 2));
