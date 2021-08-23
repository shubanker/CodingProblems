import { TreeNode } from "../_includes/treeNode";
/**
Two Sum IV - Input is a BST
Given the root of a Binary Search Tree and a target number k, return true if there exist two elements in the BST such that their sum is equal to the given target.

 

Example 1:


Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Example 2:


Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
Example 3:

Input: root = [2,1,3], k = 4
Output: true
Example 4:

Input: root = [2,1,3], k = 1
Output: false
Example 5:

Input: root = [2,1,3], k = 3
Output: true
 

Constraints:

The number of nodes in the tree is in the range [1, 10^4].
-10^4 <= Node.val <= 10^4
root is guaranteed to be a valid binary search tree.
-10^5 <= k <= 10^5
 */

function findTarget(root: TreeNode | null, k: number): boolean {
  let set = new Set<number>();
  const findSum = (node: TreeNode) => {
    if (!node) return false;
    const valToFind = k - node.val;
    if (set.has(valToFind)) {
      return true;
    }
    set.add(node.val);
    return findSum(node.left) || findSum(node.right);
  };
  return findSum(root);
}
