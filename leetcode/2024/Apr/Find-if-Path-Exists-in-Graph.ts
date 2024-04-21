/**
1971. Find if Path Exists in Graph

There is a bi-directional graph with n vertices, 
where each vertex is labeled from 0 to n - 1 (inclusive). 
The edges in the graph are represented as a 2D integer array edges, 
where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. 
Every vertex pair is connected by at most one edge, and no vertex has an edge to itself
You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

 

Example 1:


Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2
Example 2:


Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.
 

Constraints:

1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.
 */

function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  if (source === destination) {
    return true;
  }
  const map: Record<number, Set<number>> = {};

  const findLinkedPoints = (source: number, position: number, edges = new Set<number>(), c = 0) => {
    if (map[source].has(position) || edges.has(position)) {
      return edges;
    }
    for (let v of map[position]) {
      if (!map[source].has(v)) {
        edges.add(v);
        findLinkedPoints(source, v, edges, c + 1);
      }
    }
    return edges;
  };
  for (let [a, b] of edges) {
    map[b] ??= map[a];
    map[a] ??= map[b] ??= new Set();
    map[a].add(a);
    map[a].add(b);
    if (map[a] !== map[b]) {
      map[b].forEach((position) => {
        const ed = findLinkedPoints(a, position);
        ed.forEach((el) => {
          map[a].add(el);
          map[el] = map[a];
        });
      });
    }
    if (map[a].has(source) && map[a].has(destination)) {
      return true;
    }
  }

  return !!map[source]?.has(destination);
}
console.log(
  validPath(
    1,
    [
      [41, 40],
      [9, 32],
      [48, 14],
      [6, 44],
      [18, 41],
      [41, 1],
      [7, 41],
      [38, 41],
      [19, 4],
      [16, 41],
      [41, 43],
      [41, 22],
      [41, 21],
      [9, 0],
      [41, 48],
      [32, 36],
      [24, 44],
      [39, 41],
      [48, 17],
      [49, 15],
      [47, 41],
      [19, 31],
      [11, 41],
      [41, 23],
      [41, 49],
      [45, 44],
      [2, 49],
      [13, 41],
      [35, 41],
      [30, 0],
      [5, 44],
      [8, 0],
      [41, 20],
      [41, 28],
      [12, 11],
      [12, 41],
      [49, 10],
      [19, 0],
      [0, 37],
      [34, 41],
      [42, 48],
      [27, 41],
      [0, 41],
      [19, 44],
      [41, 26],
      [41, 29],
      [33, 41],
      [49, 46],
      [41, 25],
      [3, 41],
    ],
    40,
    3
  )
);
