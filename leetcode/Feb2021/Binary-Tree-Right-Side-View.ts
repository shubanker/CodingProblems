/**
Binary Tree Right Side View
Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example:

Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
Explanation:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
 */

import { TreeNode } from "../_includes/treeNode";

function rightSideView(root: TreeNode | null): number[] {
  const rights: number[] = [];
  if (!root) {
    return rights;
  }
  let stack = [root];
  while (stack.length) {
    const nextLevel: TreeNode[] = [];
    stack.forEach((node) => {
      if (node.left) {
        nextLevel.push(node.left);
      }
      if (node.right) {
        nextLevel.push(node.right);
      }
    });
    rights.push(stack[stack.length - 1].val);
    stack = nextLevel;
  }
  return rights;
}
