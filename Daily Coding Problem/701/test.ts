import { findMinDrinks } from "./701 - lazy bartender";

const preferences = {
  0: [0, 1, 3, 6],
  1: [1, 4, 7],
  2: [2, 4, 7, 5],
  3: [3, 2, 5],
  4: [5, 8],
};
const drinks = findMinDrinks(preferences);
console.log(drinks);
