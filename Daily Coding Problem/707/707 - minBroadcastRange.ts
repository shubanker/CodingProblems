/**
You are the technical director of WSPT radio, serving listeners nationwide. 
For simplicity's sake we can consider each listener to live along a horizontal line stretching from 0 (west) to 1000 (east).

Given a list of N listeners, and a list of M radio towers, each placed at various locations along this line, 
determine what the minimum broadcast range would have to be in order for each listener's home to be covered.

For example, suppose listeners = [1, 5, 11, 20], and towers = [4, 8, 15]. 
In this case the minimum range would be 5, since that would be required for the tower at position 15 to reach the listener at position 20.
 */
const getMinRange = (listners: number[], towers: number[]) => {
  const towersSorted = towers.sort((a, b) => a - b);
  let minRange = 0;
  listners.forEach((listner) => {
    const distance = Math.abs(listner - closestTower(listner, towersSorted));
    if (minRange < distance) {
      minRange = distance;
    }
  });
  return minRange;
};

const closestTower = (listner: number, towers: number[]) => {
  let min = 0;
  let max = towers.length;
  let mid: number;
  while (max > min) {
    mid = Math.floor((max + min) / 2);
    if (towers[mid] === listner) {
      return towers[mid];
    } else if (towers[mid] > listner) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }
  //We coudnt find tower at exact location(expected) but closest tower is mid +- 1.
  mid--;
  let minDistance = Infinity;
  let towerIndex = mid;
  for (let index = 0; index < 3; index++) {
    const i = mid + index;
    if (i >= 0 && i < towers.length) {
      const distance = Math.abs(towers[i] - listner);

      if (distance < minDistance) {
        minDistance = distance;
        towerIndex = i;
      }
    }
  }
  return towers[towerIndex];
};
