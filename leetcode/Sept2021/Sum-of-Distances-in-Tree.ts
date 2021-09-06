/**
Sum of Distances in Tree
There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

Return an array answer of length n where answer[i] is the sum of the distances between the ith node in the tree and all other nodes.

 

Example 1:


Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above.
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.
Hence, answer[0] = 8, and so on.
Example 2:


Input: n = 1, edges = []
Output: [0]
Example 3:


Input: n = 2, edges = [[1,0]]
Output: [1,1]
 

Constraints:

1 <= n <= 3 * 104
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
ai != bi
The given input represents a valid tree.
 */
function sumOfDistancesInTree(N: number, edges: number[][]): number[] {
  const memo = new Map();
  for (let i = 0; i < N; i++) {
    memo.set(i, []);
  }
  for (let i = 0; i < edges.length; i++) {
    memo.get(edges[i][0]).push(edges[i][1]);
    memo.get(edges[i][1]).push(edges[i][0]);
  }
  let dp = Array(N).fill(0);
  let nodes = Array(N).fill(0);
  function dfs(dp, nodes, g, start, father) {
    nodes[start] = 1;
    let neis = g.get(start);

    for (let i = 0; i < neis.length; i++) {
      if (neis[i] == father) {
        continue;
      }
      dfs(dp, nodes, g, neis[i], start);
      nodes[start] += nodes[neis[i]];
      dp[start] += dp[neis[i]] + nodes[neis[i]];
    }
  }

  function dfs2(dp, nodes, g, start, father, len, res, N) {
    let neis = g.get(start);
    for (let i = 0; i < neis.length; i++) {
      if (g.get(start)[i] == father) {
        continue;
      }
      let j = neis[i];
      res[j] = dp[j] + (len - dp[j] - nodes[j]) + (N - nodes[j]);
      dfs2(dp, nodes, g, j, start, res[j], res, N);
    }
  }
  dfs(dp, nodes, memo, 0, -1);
  let res = Array(N).fill(0);
  res[0] = dp[0];
  dfs2(dp, nodes, memo, 0, -1, res[0], res, N);
  return res;
}
