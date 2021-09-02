import { TreeNode } from "../_includes/treeNode";

/**
Unique Binary Search Trees II
Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

 

Example 1:


Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
Example 2:

Input: n = 1
Output: [[1]]
 

Constraints:

1 <= n <= 8
 */
function generateTrees(n: number): Array<TreeNode | null> {
  if (n < 1) return [];
  const dp = [...Array(n + 1)].map((r) => Array(n + 1));
  return generate(1, n);

  function generate(s, e) {
    if (s > e) return [null];
    if (dp[s][e]) return dp[s][e];

    const res = [];
    for (let root = s; root <= e; root++) {
      for (let left of generate(s, root - 1)) {
        for (let right of generate(root + 1, e)) {
          const newTree = new TreeNode(root);
          newTree.left = left;
          newTree.right = right;
          res.push(newTree);
        }
      }
    }

    dp[s][e] = res;
    return res;
  }
}
