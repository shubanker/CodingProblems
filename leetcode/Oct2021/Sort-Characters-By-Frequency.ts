/**
Sort Characters By Frequency
Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

 

Example 1:

Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:

Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
 

Constraints:

1 <= s.length <= 5 * 105
s consists of uppercase and lowercase English letters and digits.
 */
//Alternate approach using Array
function frequencySort(s: string): string {
  const mapAr = Array(75).fill(0);
  for (const char of s) {
    mapAr[char.charCodeAt(0) - 48]++;
  }
  const sortedGuy = Array(75)
    .fill(0)
    .map((_, i) => i)
    .sort((a, b) => mapAr[b] - mapAr[a]);
  let result = "";
  for (const charIndex of sortedGuy) {
    if (mapAr[charIndex] > 0) {
      result += String.fromCharCode(charIndex + 48).repeat(mapAr[charIndex]);
    } else {
      break;
    }
  }
  return result;
}
function frequencySort_(s: string): string {
  const charMap = new Map<string, number>();
  for (const char of s) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  const reverseMap = new Map<number, string[]>();
  for (const [char, count] of charMap.entries()) {
    if (!reverseMap.has(count)) {
      reverseMap.set(count, []);
    }
    reverseMap.get(count).push(char);
  }
  const sortedCount = Array.from(reverseMap.keys()).sort((a, b) => b - a);
  let result = "";
  for (const count of sortedCount) {
    for (const char of reverseMap.get(count)) {
      result += char.repeat(count);
    }
  }
  return result;
}
