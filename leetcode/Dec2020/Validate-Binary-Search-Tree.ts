/**
Validate Binary Search Tree
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:


Input: root = [2,1,3]
Output: true
Example 2:


Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
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

  function isValidBST(root: TreeNode | null): boolean {
    return checkBSTValidity(root, -Infinity, Infinity);
  }
  function checkBSTValidity(root: TreeNode | null, low: number, high: number) {
    if (root === null) {
      return true;
    }
    if (root.val <= low || root.val >= high) {
      return false;
    }
    return checkBSTValidity(root.left, low, root.val) && checkBSTValidity(root.right, root.val, high);
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

  //Utils
  const arrayToTree = (ar: number[]) => {
    const root = new TreeNode(ar[0]);
    let leafNodes: TreeNode[] = [root];
    const getNode = (number: number) => {
      if (number === null) {
        return null;
      }
      return new TreeNode(number);
    };
    for (let index = 1; index < ar.length; ) {
      let nextLeafes = [];
      leafNodes.forEach((leaf) => {
        if (index < ar.length) {
          leaf.left = getNode(ar[index]);
        }
        if (index + 1 < ar.length) {
          leaf.right = getNode(ar[index + 1]);
        }
        index += 2;
        if (leaf.left) {
          nextLeafes.push(leaf.left);
        }
        if (leaf.right) {
          nextLeafes.push(leaf.right);
        }
      });
      leafNodes = nextLeafes;
    }
    return root;
  };
  console.log(isValidBST(arrayToTree([2, 1, 3])));
  console.log(isValidBST(arrayToTree([5, 4, 6, null, null, 3, 7])));
}
