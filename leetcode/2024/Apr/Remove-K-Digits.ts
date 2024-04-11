/**
402. Remove K Digits
Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

 

Example 1:

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
Example 2:

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
Example 3:

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
 

Constraints:

1 <= k <= num.length <= 105
num consists of only digits.
num does not have any leading zeros except for the zero itself.
 */
function removeKdigits__(num: string, k: number): string {
  for (let i = 0; i < num.length - 1 && k > 0; ) {
    if (num[i] > num[i + 1]) {
      num = num.substring(0, i) + num.substring(i + 1);
      k--;
      if (num[0] === "0") {
        num = +num + "";
      }
    } else {
      i++;
    }
  }
  for (let i = 9; i > -1 && k > 0; i--) {
    const num2 = num;
    num = num.replace(i + "", "");
    if (num2 !== num) {
      k--;
    }
  }
  while (num[0] === "0") {
    num = num.substring(1);
  }
  if (num.length == 0) {
    num = "0";
  }
  return num.substring(k);
}

function removeKdigits_(numString: string, k: number): string {
  // Convert the string to an array of characters for easier manipulation
  let digitArray = [...numString];

  let loopCount = 1;
  let lastIndex = 0;
  // Keep removing digits until we have removed k digits
  while (k > 0) {
    let indexToDelete = Math.max(lastIndex - 1, 0); // Initialize deletion index

    // Find where the digit is greater than the one following it; that's our deletion target
    while (indexToDelete < digitArray.length - 1 && digitArray[indexToDelete + 1] >= digitArray[indexToDelete]) {
      indexToDelete++;
    }
    let char = digitArray[indexToDelete];
    // digitArray.splice(indexToDelete, 1);
    // k--;
    let i = 1;
    while (digitArray[indexToDelete - i] === char) {
      i++;
    }
    i = Math.min(i, k);
    digitArray.splice(indexToDelete - i + 1, i);
    k -= i;
    lastIndex = indexToDelete - i;
    //console.log(`loop count ${loopCount++}, removedElements ${i}, new length ${digitArray.length}`)
  }

  // Join the array back into a string and strip leading zeroes, if any
  let result = digitArray.join("").replace(/^0*/g, "");

  // If the result is an empty string, return '0', otherwise return the processed number string
  return result || "0";
}
function removeKdigits(num: string, k: number): string {
  let stk = [],
    rem = 0;
  for (let n of num) {
    while (stk.length && n < stk[stk.length - 1] && rem < k) {
      stk.pop();
      rem++;
    }
    stk.push(n);
  }
  while (rem < k) {
    stk.pop();
    rem++;
  }
  while (stk[0] === "0") {
    stk.shift();
  }
  return stk.length ? stk.join("") : "0";
}
