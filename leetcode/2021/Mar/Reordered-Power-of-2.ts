/**
Reordered Power of 2
Starting with a positive integer N, we reorder the digits in any order (including the original order) such that the leading digit is not zero.

Return true if and only if we can do this in a way such that the resulting number is a power of 2.

 

Example 1:

Input: 1
Output: true
Example 2:

Input: 10
Output: false
Example 3:

Input: 16
Output: true
Example 4:

Input: 24
Output: false
Example 5:

Input: 46
Output: true
 

Note:

1 <= N <= 10^9
 */

// With caching for multiple test cases.
const cachedByLength: string[][] = [[]];
let lastComputedPower = 1;
const sortNumberStringDesc = (str: string) =>
  str
    .split("")
    .sort((a, b) => +b - +a)
    .join("");
function reorderedPowerOf2(N: number): boolean {
  const sortedN = sortNumberStringDesc(N + "");
  while (String(lastComputedPower).length <= sortedN.length) {
    const str = sortNumberStringDesc(lastComputedPower + "");
    if (!cachedByLength[str.length]) {
      cachedByLength[str.length] = [];
    }
    cachedByLength[str.length].push(str);
    lastComputedPower <<= 1;
  }
  return cachedByLength[sortedN.length].includes(sortedN);
}

//Original
function reorderedPowerOf2_(N: number): boolean {
  const sortDesc = (str: string) =>
    str
      .split("")
      .sort((a, b) => +b - +a)
      .join("");
  const sortedN = sortDesc(N + "");
  const possiblePowers = [];
  let start = 1;
  while (true) {
    const str = String(start);
    if (str.length > sortedN.length) {
      break;
    }
    if (str.length === sortedN.length) {
      possiblePowers.push(sortDesc(str));
    }
    start <<= 1;
  }
  return possiblePowers.includes(sortedN);
}

console.log(reorderedPowerOf2(16));
