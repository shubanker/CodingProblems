/**
This problem was asked by Triplebyte.

You are given n numbers as well as n probabilities that sum up to 1. Write a function to generate one of the numbers with its corresponding probability.

For example, given the numbers [1, 2, 3, 4] and probabilities [0.1, 0.5, 0.2, 0.2], your function should return 1 10% of the time, 2 50% of the time, and 3 and 4 20% of the time.

You can generate random numbers between 0 and 1 uniformly.


 */
const getGCD = (n1: number, n2: number) => {
  if (n1 === 0) return n2;
  return getGCD(n2 % n1, n1);
};
function getRandomElementWithProbability(numbers: number[], priority: number[]) {
  let gcd = priority.reduce((a, b) => getGCD(a, b * 1000), 0);
  const newPriporty = priority.map((p) => (p * 1000) / gcd);

  const totalCombinations = newPriporty.reduce((a, b) => a + b);
  let nthElement = Math.floor(Math.random() * totalCombinations) + 1;

  let i = 0;
  while (nthElement > newPriporty[i]) {
    nthElement -= newPriporty[i++];
  }
  return numbers[i];
}

const op = {};
const numbers = [1, 2, 3, 4];
const probability = [0.1, 0.5, 0.2, 0.2];
for (let index = 0; index < 1000000; index++) {
  const num = getRandomElementWithProbability(numbers, probability);
  if (!op[num]) {
    op[num] = 0;
  }
  op[num]++;
}
console.log(op);
