import { TreeNode } from "../_includes/treeNode";
import { arrayToTree } from "../_includes/utils";

/**
Convert BST to Greater Tree
Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
Note: This question is the same as 1038: https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/

 

Example 1:


Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
Example 2:

Input: root = [0,null,1]
Output: [1,null,1]
Example 3:

Input: root = [1,0,2]
Output: [3,3,2]
Example 4:

Input: root = [3,2,4,1]
Output: [7,9,4,10]
 

Constraints:

The number of nodes in the tree is in the range [0, 104].
-10^4 <= Node.val <= 10^4
All the values in the tree are unique.
root is guaranteed to be a valid binary search tree.
 */
function convertBST(root: TreeNode | null): TreeNode | null {
  const stack: TreeNode[] = [];
  let iterator = root;
  let sumUntil = 0;
  while (stack.length || iterator) {
    if (iterator) {
      stack.push(iterator);
      iterator = iterator.right;
    } else {
      const node = stack.pop();
      node.val += sumUntil;
      sumUntil = node.val;
      iterator = node.left;
    }
  }
  return root;
}
//Using Recusrsion
function convertBST_recursion(root: TreeNode | null): TreeNode | null {
  increseValue(root, 0);
  return root;
}
const increseValue = (root: TreeNode | null, sumUntil: number) => {
  if (root) {
    sumUntil = increseValue(root.right, sumUntil);
    root.val += sumUntil;
    sumUntil = root.val;
    sumUntil = increseValue(root.left, sumUntil);
  }
  return sumUntil;
};

console.log(convertBST(arrayToTree([1, 0, 2])));
