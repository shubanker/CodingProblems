import { runTests } from "../../test";

/**
Is Graph Bipartite ?
Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split its set of nodes into two independent subsets A and B, such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists. Each node is an integer between 0 and graph.length - 1. There are no self edges or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.

 

Example 1:


Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can divide the vertices into two groups: {0, 2} and {1, 3}.

Example 2:


Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: We cannot find a way to divide the set of nodes into two independent subsets.
 

Constraints:

1 <= graph.length <= 100
0 <= graph[i].length < 100
0 <= graph[i][j] <= graph.length - 1
graph[i][j] != i
All the values of graph[i] are unique.
The graph is guaranteed to be undirected. 
 */
function isBipartite(graph: number[][]): boolean {
  const setA = new Set<number>([0]);
  const setB = new Set<number>(graph[0]);

  const visited = new Set([0]);

  let queue = graph[0];
  let currentSet = setA;
  let oppositSet = setB;
  while (true) {
    const nextQueue = new Set<number>();
    for (let i = 0; i < queue.length; i++) {
      visited.add(queue[i]);
      if (currentSet.has(queue[i])) {
        return false;
      }
      for (let j = 0; j < graph[queue[i]].length; j++) {
        const element = graph[queue[i]][j];
        if (oppositSet.has(element)) {
          return false;
        }
        currentSet.add(element);
        if (!visited.has(element)) {
          visited.add(element);
          nextQueue.add(element);
        }
      }
    }
    queue = [...nextQueue];
    if (queue.length === 0) {
      //finding disconnected nodes.
      for (let t = 0; t < graph.length; t++) {
        if (!visited.has(t)) {
          queue.push(t);
          break;
        }
      }
    }
    if (queue.length === 0) {
      break;
    }
    [currentSet, oppositSet] = [oppositSet, currentSet];
  }
  return true;
}
console.log(
  isBipartite([
    [4, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 0],
  ])
);
console.log(
  runTests(
    [
      {
        arguments: [
          [
            [1, 3],
            [0, 2],
            [1, 3],
            [0, 2],
          ],
        ],
        output: true,
      },
      {
        arguments: [[[4], [], [4], [4], [0, 2, 3]]],
        output: true,
      },
      {
        arguments: [
          [
            [4, 1],
            [0, 2],
            [1, 3],
            [2, 4],
            [3, 0],
          ],
        ],
        output: false,
      },
    ],
    isBipartite
  )
);
