/**
310. Minimum Height Trees

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

 

Example 1:


Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
Example 2:


Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]
 

Constraints:

1 <= n <= 2 * 104
edges.length == n - 1
0 <= ai, bi < n
ai != bi
All the pairs (ai, bi) are distinct.
The given input is guaranteed to be a tree and there will be no repeated edges.
 */
function findMinHeightTrees(n: number, edges: number[][]): number[] {
  if (n < 2) {
    return [0];
  }
  const connectedMap: Record<number, number[]> = {};

  edges.forEach(([a, b]) => {
    (connectedMap[a] ??= []).push(b);
    (connectedMap[b] ??= []).push(a);
  });
  const findFurthestNode = (start: number, nodeAt = -1) => {
    let distance = 0;
    const visited = new Set([start]);
    const next = new Set([start]);
    while (true) {
      distance++;
      const previous = [...next];
      next.clear();
      for (let pos of previous) {
        connectedMap[pos].forEach((i) => {
          if (visited.has(i)) {
            return;
          }
          next.add(i);
          visited.add(i);
        });
      }
      if (next.size === 0 || (nodeAt + 1 && distance === nodeAt)) {
        return { node: previous[0], distance, next };
      }
    }
  };
  const head = findFurthestNode(0).node;
  const { distance, node } = findFurthestNode(head);
  const center = findFurthestNode(head, Math.floor(distance / 2));

  // This logic works by luck (first element somehow works), needs to go through.
  const nodes = [connectedMap[center.node][0]];
  if (distance % 2 == 0) {
    nodes.push(center.node);
  }

  return nodes;
}
function findMinHeightTrees_(n: number, edges: number[][]): number[] {
  if (n < 2) {
    return [0];
  }
  let maxVisited = 0;
  const Threshold = 20 / 100;
  const connectedMap: Record<number, number[]> = {};

  edges.forEach(([a, b]) => {
    (connectedMap[a] ??= []).push(b);
    (connectedMap[b] ??= []).push(a);
  });
  let nextVisits: { next: Set<number>; visited: Set<number>; i: number }[] = Array(n)
    .fill(n)
    .map((_, i) => ({ next: new Set([i]), visited: new Set([i]), i }));
  let reached = false;
  const nodes = [];
  while (!reached) {
    for (let i = 0; i < nextVisits.length; i++) {
      const node = nextVisits[i];
      const previous = [...node.next];
      node.next.clear();
      previous.forEach((p) => {
        connectedMap[p].forEach((forwardIndex) => {
          if (!node.visited.has(forwardIndex)) {
            node.next.add(forwardIndex);
            node.visited.add(forwardIndex);
          }
        });
      });
      maxVisited = Math.max(maxVisited, node.visited.size);
      reached ||= node.visited.size > n - 1;
      if (node.visited.size > n - 1) {
        nodes.push(node.i);
      }
    }
    nextVisits = nextVisits.filter((node) => node.visited.size >= maxVisited * Threshold);
  }

  return nodes;
}
console.time("abc");
console.log(
  findMinHeightTrees(4, [
    [1, 0],
    [1, 2],
    [1, 3],
  ])
);

console.timeEnd("abc");
