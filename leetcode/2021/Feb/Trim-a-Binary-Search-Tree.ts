/**
Trim a Binary Search Tree
Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.

 

Example 1:


Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]
Example 2:


Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
Output: [3,2,null,1]
Example 3:

Input: root = [1], low = 1, high = 2
Output: [1]
Example 4:

Input: root = [1,null,2], low = 1, high = 3
Output: [1,null,2]
Example 5:

Input: root = [1,null,2], low = 2, high = 4
Output: [2]
 

Constraints:

The number of nodes in the tree in the range [1, 104].
0 <= Node.val <= 104
The value of each node in the tree is unique.
root is guaranteed to be a valid binary search tree.
0 <= low <= high <= 104
 */
{
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

  //Optimal/Easy Approach
  const trimBST2 = (root: TreeNode | null, low: number, high: number) => {
    if (root === null) {
      return root;
    }
    if (root.val > high) {
      return trimBST(root.left, low, high);
    }
    if (root.val < low) {
      return trimBST(root.right, low, high);
    }

    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
  };

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

  const trimBST = (root: TreeNode | null, low: number, high: number) => {
    if (!root) {
      return null;
    }
    const tempNode = new TreeNode(Infinity, root);
    trimBSTRec(root, low, high, tempNode);
    return tempNode.left;
  };
  const trimBSTRec = (node: TreeNode | null, low: number, high: number, parent: TreeNode | null) => {
    if (!node) {
      return null;
    }
    if (node.val < low) {
      node.left = null;
    }
    if (node.val > high) {
      node.right = null;
    }
    trimBSTRec(node.left, low, high, node);
    trimBSTRec(node.right, low, high, node);
    if (node.val < low || node.val > high) {
      deleteFromBst(node, parent);
    }
  };
  const deleteFromBst = (node: TreeNode, parent: TreeNode | null) => {
    if (node == null) {
      return parent;
    }
    const side = node === parent.left ? "left" : "right";
    if (!(node.left || node.right)) {
      //Lesf Node
      parent[side] = null;
      return parent;
    } else if (node.left && node.right) {
      //Has 2 childs
      const [minNode, minParent] = findMin(node.right);
      node.val = minNode.val;
      deleteFromBst(minNode, minParent ?? node);
    } else {
      parent[side] = node.left || node.right;
    }
  };
  const findMin = (node: TreeNode) => {
    let min = node,
      minParent: TreeNode = null;
    while (node) {
      minParent = node;
      min = node.left || min;
      node = node.left;
    }
    return [min, minParent];
  };
}
