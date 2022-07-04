import { TreeNode } from "../_includes/treeNode";

/**
Binary Tree Level Order Traversal
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
 */
function levelOrder(root: TreeNode | null): number[][] {
  const op: number[][] = [];
  let stack: TreeNode[] = [root].filter((d) => d);
  while (stack.length) {
    const currentVals = [];
    const nextStack = [];
    op.push(currentVals);
    stack.forEach((node) => {
      currentVals.push(node.val);
      node.left && nextStack.push(node.left);
      node.right && nextStack.push(node.right);
    });
    stack = nextStack;
  }
  return op;
}
