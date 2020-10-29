// Daily Coding Problem: Problem #694
// https://stackoverflow.com/questions/51346136/given-an-array-of-integers-find-the-first-missing-positive-integer-in-linear-ti

function getMissingInt(array: number[]) {
  const segArray = array.filter((a) => a > 0);

  for (let i = 0; i < segArray.length; i++) {
    const value = Math.abs(segArray[i]);
    if (value <= segArray.length && segArray[value - 1] > 0) {
      segArray[value - 1] *= -1;
    }
  }
  for (let i = 0; i < segArray.length; i++) {
    if (segArray[i] > 0) {
      return i + 1;
    }
  }
  return segArray.length + 1;
}
console.log(getMissingInt([1, -1, -5, -3, 3, 4, 2, 8]));
