const smallestDivisor = (ar: number[], th: number) => {
  let min: number, max: number;
  min = max = ar[0];
  for (let index = 1; index < ar.length; index++) {
    if (ar[index] < min) {
      min = ar[index];
    }
    if (ar[index] > max) {
      max = ar[index];
    }
  }
  while (min < max) {
    const mid = Math.floor((min + max) / 2);
    if (th >= getDivSum(ar, mid)) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }
  return max;
};
const getDivSum = (ar: number[], div: number) => {
  return ar.reduce((a, b) => {
    a += Math.ceil(b / div);
    return a;
  }, 0);
};

const tests: { array: number[]; threshold: number }[] = [
  {
    array: [1, 2, 5, 9],
    threshold: 6,
  },
];
tests.forEach((item) => {
  console.log(smallestDivisor(item.array, item.threshold));
});
