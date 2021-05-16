import { TreeNode } from "../_includes/treeNode";
/**
Binary Tree Cameras
Given a binary tree, we install cameras on the nodes of the tree. 

Each camera at a node can monitor its parent, itself, and its immediate children.

Calculate the minimum number of cameras needed to monitor all nodes of the tree.

 

Example 1:


Input: [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.
Example 2:


Input: [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.

Note:

The number of nodes in the given tree will be in the range [1, 1000].
Every node has value 0.
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

function minCameraCover(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  const [count] = minCameraCoverRec(root);

  return count + (root.val ? 0 : 1);
}

function minCameraCoverRec(root: TreeNode | null) {
  if (!root || (!root.left && !root.right)) {
    return [0, false];
  }

  const [leftCount, hasLeftCamera] = minCameraCoverRec(root.left);
  const [rightCount, hasRightCamera] = minCameraCoverRec(root.right);

  if (root.left?.val === 0 || root.right?.val === 0) {
    root.val = 1;
    return [leftCount + rightCount + 1, true];
  }

  if (hasLeftCamera || hasRightCamera) {
    root.val = 1;
  }

  return [leftCount + rightCount, false];
}
