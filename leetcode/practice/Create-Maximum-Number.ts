/**
Create Maximum Number
Given two arrays of length m and n with digits 0-9 representing two numbers. Create the maximum number of length k <= m + n from digits of the two. The relative order of the digits from the same array must be preserved. Return an array of the k digits.

Note: You should try to optimize your time and space complexity.

Example 1:

Input:
nums1 = [3, 4, 6, 5]
nums2 = [9, 1, 2, 5, 8, 3]
k = 5
Output:
[9, 8, 6, 5, 3]
Example 2:

Input:
nums1 = [6, 7]
nums2 = [6, 0, 4]
k = 5
Output:
[6, 7, 6, 0, 4]
Example 3:

Input:
nums1 = [3, 9]
nums2 = [8, 9]
k = 3
Output:
[9, 8, 9]
 */

//UnOptimised/unsolved
//  https://leetcode.com/submissions/detail/461772724/
function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
  return findMaxNumber(nums1, nums2, k, 0, 0);
}
const findMaxNumber = (nums1: number[], nums2: number[], k: number, start1: number, start2: number) => {
  const stack: number[] = [];
  for (let i = 0; i < k; i++) {
    const underflow1 = nums2.length - start2 - (k - i);
    const underflow2 = nums1.length - start1 - (k - i);
    const upto1 = Math.min(nums1.length, underflow1 < 0 ? nums1.length + underflow1 + 1 : nums1.length);
    const upto2 = Math.min(nums2.length, underflow2 < 0 ? nums2.length + underflow2 + 1 : nums2.length);

    //Max Index withing range in array.
    const max1 = getMax(nums1, start1, upto1);
    const max2 = getMax(nums2, start2, upto2);
    let isAr1 = true;
    if (max1 + 1 && nums1[max1] === nums2[max2]) {
      const ar1 = new Array(10).fill(0);
      const ar2 = new Array(10).fill(0);
      for (let j = start1; j < max1; j++) {
        ar1[nums1[j]]++;
      }
      for (let j = start2; j < max2; j++) {
        ar2[nums2[j]]++;
      }
      let compareIndex = 9;
      while (compareIndex > 0) {
        if (ar1[compareIndex] !== ar2[compareIndex]) {
          isAr1 = ar1[compareIndex] < ar2[compareIndex];
          break;
        }
        compareIndex--;
      }
      if (compareIndex === 0) {
        isAr1 = nums1.length - max1 > nums2.length - max2;
      }
    } else if (max1 + 1 && (max2 === -1 || nums1[max1] > nums2[max2])) {
      isAr1 = true;
    } else if (max2 + 1) {
      isAr1 = false;
    } else {
      return stack; //Shoudnt hit ideally
    }
    if (isAr1) {
      stack.push(nums1[max1]);
      start1 = max1 + 1;
    } else {
      stack.push(nums2[max2]);
      start2 = max2 + 1;
    }
  }
  return stack;
};
const getMaxOfArray = (ar1: number[], ar2: number[]) => {
  return +ar1.join("") > +ar2.join("") ? ar1 : ar2;
};
const getMax = (array: number[], start: number, upto: number) => {
  if (upto - start <= 0) {
    return -1;
  }
  let max = start;
  for (let i = start + 1; i < upto && array[max] < 9; i++) {
    if (array[max] < array[i]) {
      max = i;
    }
  }
  return max;
};
console.log(maxNumber([6, 7], [6, 0, 4], 5));
console.log(maxNumber([2, 5, 6, 4, 4, 0], [7, 3, 8, 0, 6, 5, 7, 6, 2], 15));
console.log(maxNumber([3, 9], [8, 9], 3));
console.log(maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5));
