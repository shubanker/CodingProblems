/**
Check If a String Contains All Binary Codes of Size K
Given a binary string s and an integer k.

Return True if every binary code of length k is a substring of s. Otherwise, return False.

 

Example 1:

Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indicies 0, 1, 3 and 2 respectively.
Example 2:

Input: s = "00110", k = 2
Output: true
Example 3:

Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 
Example 4:

Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and doesn't exist in the array.
Example 5:

Input: s = "0000000001011100", k = 4
Output: false
 

Constraints:

1 <= s.length <= 5 * 10^5
s consists of 0's and 1's only.
1 <= k <= 20
 */
function hasAllCodes(s: string, k: number): boolean {
  const maxVals = Math.pow(2, k);
  const TRAI_HEAD = new Map<string, any>();
  for (let i = 0; i <= s.length - k; i++) {
    let curr = TRAI_HEAD;
    for (let j = i; j < i + k; j++) {
      if (!curr.has(s[j])) {
        curr.set(s[j], new Map<string, any>());
      }
      curr = curr.get(s[j]);
    }
  }
  const countLeafNodesAtHeightK = (curr: Map<string, any>, height: number): number => {
    if (height === k) {
      return 1;
    }
    if (!curr) {
      return 0;
    }
    let count = 0;
    for (const innerMaps of curr.values()) {
      count += countLeafNodesAtHeightK(innerMaps, height + 1);
    }
    return count;
  };

  return maxVals === countLeafNodesAtHeightK(TRAI_HEAD, 0);
}
console.log(hasAllCodes("00000000001011100", 3));
// console.log(hasAllCodes("0110", 2));
