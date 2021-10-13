import { TreeNode } from "../_includes/treeNode";
/**
Construct Binary Search Tree from Preorder Traversal
Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.

It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

A binary search tree is a binary tree where for every node, any descendant of Node.left has a value strictly less than Node.val, and any descendant of Node.right has a value strictly greater than Node.val.

A preorder traversal of a binary tree displays the value of the node first, then traverses Node.left, then traverses Node.right.

 

Example 1:


Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
Example 2:

Input: preorder = [1,3]
Output: [1,null,3]
 

Constraints:

1 <= preorder.length <= 100
1 <= preorder[i] <= 1000
All the values of preorder are unique.
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  let index = 0;
  return preOrderTraversal(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

  function preOrderTraversal(lowerBound, upperBound) {
    if (index == preorder.length) return null;

    if (preorder[index] >= lowerBound && preorder[index] < upperBound) {
      const root = new TreeNode(preorder[index++]);
      root.left = preOrderTraversal(lowerBound, root.val);
      root.right = preOrderTraversal(root.val, upperBound);

      return root;
    }

    return null;
  }
};
