import { findMinDrinks } from "./701 - lazy bartender";

const preferences1 = {
  0: [0, 1, 3, 6],
  1: [1, 4, 7],
  2: [2, 4, 7, 5],
  3: [3, 2, 5],
  4: [5, 8],
};
const preferences2 = { ...preferences1, 0: [9, 50, 3] };
const preferences3 = { ...preferences2, p1: [8] };

console.log(findMinDrinks(preferences1));
console.log(findMinDrinks(preferences2));
console.log(findMinDrinks(preferences3));
