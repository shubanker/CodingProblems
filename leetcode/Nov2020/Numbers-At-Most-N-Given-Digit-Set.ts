/**
Given an array of digits, you can write numbers using each digits[i] as many times as we want.  For example, if digits = ['1','3','5'], we may write numbers such as '13', '551', and '1351315'.

Return the number of positive integers that can be generated that are less than or equal to a given integer n.

 

Example 1:

Input: digits = ["1","3","5","7"], n = 100
Output: 20
Explanation: 
The 20 numbers that can be written are:
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
Example 2:

Input: digits = ["1","4","9"], n = 1000000000
Output: 29523
Explanation: 
We can write 3 one digit numbers, 9 two digit numbers, 27 three digit numbers,
81 four digit numbers, 243 five digit numbers, 729 six digit numbers,
2187 seven digit numbers, 6561 eight digit numbers, and 19683 nine digit numbers.
In total, this is 29523 integers that can be written using the digits array.
Example 3:

Input: digits = ["7"], n = 8
Output: 1
 

Constraints:

1 <= digits.length <= 9
digits[i].length == 1
digits[i] is a digit from '1' to '9'.
All the values in digits are unique.
1 <= n <= 109
 */

function atMostNGivenDigitSet(digits: string[], n: number): number {
  const intAr = digits.map((d) => +d).sort((a, b) => a - b);

  const largestPossibleValue = findlargestCombo(intAr, n);
  // console.log(largestPossibleValue);
  const base = digits.length;

  const digitsBaseMap = intAr.reduce((accum, item, i) => {
    accum[item] = i;
    return accum;
  }, {});
  const largestPossibleBaseValue = largestPossibleValue
    .toString()
    .split("")
    .map((d) => digitsBaseMap[d]);

  let exceptionsSum = 0;
  for (let i = 0; i < largestPossibleBaseValue.length; i++) {
    exceptionsSum += Math.pow(base, i);
  }
  let power = 1;
  return (
    largestPossibleBaseValue.reduceRight((accum, item) => {
      accum += +item * power;
      power *= base;
      return accum;
    }, 0) + exceptionsSum
  );
}
function findlargestCombo(digits: number[], n: number) {
  let length = n.toString().length;
  const ar = new Array(length).fill(digits[digits.length - 1]);
  while (+ar.join("") > n) {
    subtractOne(ar, digits);
  }
  return +ar.join("");
}
function subtractOne(numberArray: number[], digits: number[]) {
  let lastIndexWithInit: number = 0;
  for (let i = numberArray.length - 1; i >= 0; i--) {
    if (numberArray[i] != digits[0]) {
      lastIndexWithInit = i + 1;
      const index = digits.indexOf(numberArray[i]);
      numberArray[i] = digits[index - 1];
      break;
    }
  }
  if (!lastIndexWithInit) {
    numberArray.pop();
  }
  const maxDigit = digits[digits.length - 1];
  for (let i = lastIndexWithInit; i < numberArray.length; i++) {
    numberArray[i] = maxDigit;
  }
  return numberArray;
}

//Non tested/used function.
function decrementFromBack(numberArray: number[], digits: number[]) {
  let lastIndexWithMax: number = numberArray.length;
  const maxDigit = digits[digits.length - 1];
  for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] != maxDigit) {
      lastIndexWithMax = i - 1;
      const index = digits.indexOf(numberArray[i]);
      numberArray[i] = digits[index - 1];
      break;
    }
  }
  if (lastIndexWithMax === numberArray.length) {
    numberArray.shift();
  }
  // const maxDigit = digits[digits.length - 1];
  // for (let i = lastIndexWithInit; i < numberArray.length; i++) {
  //   numberArray[i] = maxDigit;
  // }
  return numberArray;
}

//Test
console.log(atMostNGivenDigitSet(["1", "3", "5", "7"], 100));
console.log(atMostNGivenDigitSet(["1", "3", "5", "7"], 76));
console.log(atMostNGivenDigitSet(["1", "4", "9"], 1000000000));
