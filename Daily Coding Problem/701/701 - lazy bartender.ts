/**
At a popular bar, each customer has a set of favorite drinks, and will happily accept any drink among this set. For example, in the following situation, customer 0 will be satisfied with drinks 0, 1, 3, or 6.

preferences = {
    0: [0, 1, 3, 6],
    1: [1, 4, 7],
    2: [2, 4, 7, 5],
    3: [3, 2, 5],
    4: [5, 8]
}
A lazy bartender working at this bar is trying to reduce his effort by limiting the drink recipes he must memorize. Given a dictionary input such as the one above, return the fewest number of drinks he must learn in order to satisfy all customers.

For the input above, the answer would be 2, as drinks 1 and 5 will satisfy everyone.
*/

export function findMinDrinks(preferences: Record<any, any[]>) {
  const preferenceCount: Record<any, number> = {};
  for (const user in preferences) {
    preferences[user].forEach((drink) => {
      if (!preferenceCount[drink]) {
        preferenceCount[drink] = 0;
      }
      preferenceCount[drink]++;
    });
  }

  const preferenceCloned = { ...preferences };
  let include = false;
  const resultDrinks: Set<string> = new Set();
  while (true) {
    let empty = true;
    let mostPopularDrink: string;
    for (const drink in preferenceCount) {
      mostPopularDrink =
        !mostPopularDrink ||
        preferenceCount[drink] > preferenceCount[mostPopularDrink]
          ? drink
          : mostPopularDrink;
    }
    for (const key in preferenceCloned) {
      empty = false;
      if (preferenceCloned[key].findIndex((d) => d == mostPopularDrink) + 1) {
        preferenceCloned[key].forEach((drink) => {
          preferenceCount[drink]--;
        });
        delete preferenceCloned[key];
      }
    }
    if (empty) {
      break;
    }
    resultDrinks.add(mostPopularDrink);
  }
  return [...resultDrinks];
  const popularDrinks = Object.keys(preferenceCount).sort(
    (a, b) => preferenceCount[b] - preferenceCount[a]
  );
  const drinks: any[] = [];
  for (let i = 0; i < popularDrinks.length; i++) {
    if (!Object.keys(preferenceCloned).length) {
      break;
    }
    for (const key in preferenceCloned) {
      if (preferenceCloned[key].findIndex((d) => d == popularDrinks[i]) + 1) {
        preferenceCloned[key].forEach((drink) => {
          preferenceCount[drink]--;
        });
        delete preferenceCloned[key];
        include = true;
      }
    }
    if (include) {
      drinks.push(popularDrinks[i]);
    }
  }
  return drinks;
}
