import { TreeNode } from "../_includes/treeNode";

/**
 Sum of Left Leaves
 Given the root of a binary tree, return the sum of all left leaves.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.
Example 2:

Input: root = [1]
Output: 0
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
-1000 <= Node.val <= 1000
 */

function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum = 0;
  const countDFS = (node: TreeNode, isLeft = false) => {
    if (node) {
      if (isLeft && !node.left && !node.right) {
        sum += node.val;
      }
      countDFS(node.left, true);
      countDFS(node.right);
    }
  };
  countDFS(root);
  return sum;
}
