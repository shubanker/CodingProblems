const smallestDivisor = (ar: number[], th: number) => {
  let min: number = 1,
    max: number = Math.max(...ar);
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
  {
    array: [2, 3, 5, 7, 11],
    threshold: 11,
  },
  {
    array: [19],
    threshold: 5,
  },
];
tests.forEach((item) => {
  console.log(smallestDivisor(item.array, item.threshold));
});
