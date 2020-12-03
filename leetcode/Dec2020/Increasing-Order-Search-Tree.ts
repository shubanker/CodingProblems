/**
Increasing Order Search Tree
Given the root of a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.

 

Example 1:


Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
Example 2:


Input: root = [5,1,7]
Output: [1,null,5,null,7]
 

Constraints:

The number of nodes in the given tree will be in the range [1, 100].
0 <= Node.val <= 1000
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
  function increasingBST(root: TreeNode | null): TreeNode | null {
    return rearrangeTree(root, false);
  }

  function rearrangeTree(root: TreeNode | null, checkLeft = true) {
    if (!root) {
      return null;
    }
    let leftMost = root;
    while (leftMost.left) {
      leftMost = leftMost.left;
    }
    const leftTail: TreeNode | null = rearrangeTree(root.left);
    if (leftTail) {
      leftTail.right = root;
    }
    root.left = null;
    root.right = rearrangeTree(root.right, false);
    if (checkLeft) {
      let rightest = root;
      while (rightest.right) {
        rightest = rightest.right;
      }
      return rightest;
    }
    return leftMost || root;
  }
  //Class
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

  //Tests
  //   const tree = arrayToTree([5, 1, 7]);
  //   const tree = arrayToTree([5, 3, 6, 2, 4, null, 8, 1, null, null, null, 7, 9]);
  //   const tree = arrayToTree([4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8]);
  const tree = arrayToTree([6, 2, 10, 0, 4, 8, 12, null, 1, 3, 5, 7, 9, 11, 13]);
  const newTree = increasingBST(tree);
  console.log(newTree);
}
