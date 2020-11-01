import { getChepestPrice } from "./700 Cheapest Path";

const flights = [
  ["JFK", "ATL", 150],
  ["ATL", "SFO", 400],
  ["LAX", "DFW", 80],
  ["JFK", "HKG", 800],
  ["ATL", "ORD", 90],
  ["JFK", "LAX", 500],
];
const flights2 = [...flights, ["ORD", "LAX", 200]];
console.log(getChepestPrice(flights, "JFK", "LAX", 3));
console.log(getChepestPrice(flights2, "JFK", "LAX", 3));
console.log(getChepestPrice(flights2, "JFK", "LAX", 2));
