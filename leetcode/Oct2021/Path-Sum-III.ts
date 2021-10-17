import { TreeNode } from "../_includes/treeNode";
/**
Path Sum III
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

 

Example 1:


Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
Example 2:

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
 

Constraints:

The number of nodes in the tree is in the range [0, 1000].
-109 <= Node.val <= 109
-1000 <= targetSum <= 1000
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
function pathSum(root: TreeNode | null, targetSum: number): number {
  let sums = new Map();
  sums.set(0, 1);

  return traverse(root, sums, 0, targetSum);
}

function traverse(node: TreeNode | null, sums: Map<number, number>, currentSum: number, targetSum: number): number {
  if (node == null) {
    return 0;
  }

  currentSum += node.val;
  let nsum = sums.get(currentSum) ?? 0;

  let count = sums.get(currentSum - targetSum) ?? 0;
  sums.set(currentSum, nsum + 1);

  count += traverse(node.left, sums, currentSum, targetSum);
  count += traverse(node.right, sums, currentSum, targetSum);

  sums.set(currentSum, nsum);

  return count;
}
