/**
Number of Provinces
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

 

Example 1:


Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Example 2:


Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
 

Constraints:

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] is 1 or 0.
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]
 */
function findCircleNum(isConnected: number[][]): number {
  const sets: Set<number>[] = Array(isConnected.length).fill(null);
  const mergeSets = (set1: Set<any>, set2: Set<any>) => {
    let starter = set1 ?? set2 ?? new Set();
    if (set1 && set2) {
      set2.forEach((item) => {
        starter.add(item);
        sets[item] = starter;
      });
      set2.clear();
    }
    return starter;
  };
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected.length; j++) {
      if (isConnected[i][j]) {
        if (sets[i] && sets[i] === sets[j]) {
          continue;
        }
        let set = mergeSets(sets[i], sets[j]);
        set.add(i);
        set.add(j);
        sets[i] = sets[j] = set;
      }
    }
  }
  return new Set(sets).size;
}
