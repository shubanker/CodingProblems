import { TreeNode } from "../_includes/treeNode";
/**
Flip Binary Tree To Match Preorder Traversal
You are given the root of a binary tree with n nodes, where each node is uniquely assigned a value from 1 to n. You are also given a sequence of n values voyage, which is the desired pre-order traversal of the binary tree.

Any node in the binary tree can be flipped by swapping its left and right subtrees. For example, flipping node 1 will have the following effect:


Flip the smallest number of nodes so that the pre-order traversal of the tree matches voyage.

Return a list of the values of all flipped nodes. You may return the answer in any order. If it is impossible to flip the nodes in the tree to make the pre-order traversal match voyage, return the list [-1].

 

Example 1:


Input: root = [1,2], voyage = [2,1]
Output: [-1]
Explanation: It is impossible to flip the nodes such that the pre-order traversal matches voyage.
Example 2:


Input: root = [1,2,3], voyage = [1,3,2]
Output: [1]
Explanation: Flipping node 1 swaps nodes 2 and 3, so the pre-order traversal matches voyage.
Example 3:


Input: root = [1,2,3], voyage = [1,2,3]
Output: []
Explanation: The tree's pre-order traversal already matches voyage, so no nodes need to be flipped.
 

Constraints:

The number of nodes in the tree is n.
n == voyage.length
1 <= n <= 100
1 <= Node.val, voyage[i] <= n
All the values in the tree are unique.
All the values in voyage are unique.
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function flipMatchVoyage(root: TreeNode | null, voyage: number[]): number[] {
  const op: number[] = [];
  const stack = [root];
  let i = 0;
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      if (node.val != voyage[i++]) {
        return [-1];
      }
      if (node.right?.val == voyage[i]) {
        if (node.left) {
          op.push(node.val);
        }
        stack.push(node.left);
        stack.push(node.right);
      } else {
        stack.push(node.right);
        stack.push(node.left);
      }
    }
  }
  return op;
}
function flipMatchVoyage_(root: TreeNode | null, voyage: number[]): number[] {
  const op: number[] = [];
  let rootStack = [root];
  let vIndex = 0;
  if (root?.val !== voyage[vIndex]) {
    return [-1];
  }
  while (rootStack.length) {
    const nextNodes = [];
    for (let i = 0; i < rootStack.length; i++) {
      const node = rootStack[i];
      const nodeVals = [node.left?.val, node.right?.val];
      if (nodeVals.includes(voyage[vIndex + 1]) && nodeVals.includes(voyage[vIndex + 2])) {
        if (voyage[vIndex + 1] !== node.left?.val) {
          op.push(node.val);
          const right = node.right;
          node.right = node.left;
          node.left = right;
        }
      } else {
        return [-1];
      }
      vIndex += 2;
      node.left && nextNodes.push(node.left);
      node.right && nextNodes.push(node.right);
    }
    rootStack = nextNodes;
  }
  return op;
}
