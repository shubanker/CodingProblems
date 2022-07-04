/**
Given the root node of a binary search tree, return the sum of values of all nodes with a value in the range [low, high].

 Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32

Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
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

{
  function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
    if (!root) {
      return 0;
    }
    return (
      (root.val >= low && root.val <= high ? root.val : 0) +
      rangeSumBST(root.left, low, high) +
      rangeSumBST(root.right, low, high)
    );
  }

  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
    }
  }
  //Tests
  console.log(rangeSumBST(new TreeNode(10, new TreeNode(5), new TreeNode(15)), 10, 15));
}
