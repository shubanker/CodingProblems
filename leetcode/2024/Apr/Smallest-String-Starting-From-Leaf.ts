/**
Smallest String Starting From Leaf
You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.

Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

As a reminder, any shorter prefix of a string is lexicographically smaller.

For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

 

Example 1:


Input: root = [0,1,2,3,4,3,4]
Output: "dba"
Example 2:


Input: root = [25,1,3,1,3,0,2]
Output: "adz"
Example 3:


Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"
 

Constraints:

The number of nodes in the tree is in the range [1, 8500].
0 <= Node.val <= 25
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

import { TreeNode } from "../../_includes/treeNode";
import { arrayToTree } from "../../_includes/utils";

const getShortestAr = (first: number[], second: number[]) => {
  if (first === second) {
    return first;
  }
  for (let i = -1; i >= -Math.min(first.length, second.length); i--) {
    if (first.at(i) === second.at(i)) {
      continue;
    }
    return first.at(i) > second.at(i) ? second : first;
  }
  return first.length > second.length ? second : first;
};
const smallestFromLeafDfs = (node: TreeNode | null, valsAr: number[] = []) => {
  if (!node) {
    return valsAr;
  }
  valsAr.push(node.val);

  // we need a new Arr only if both child nodes exist else reuse.
  let rightLeg = node.right && node.left ? valsAr.slice() : valsAr;

  let ar1 = smallestFromLeafDfs(node.left, valsAr);
  let ar2 = smallestFromLeafDfs(node.right, rightLeg);
  return getShortestAr(ar1, ar2);
};
function smallestFromLeaf(root: TreeNode | null): string {
  const shortestAr = smallestFromLeafDfs(root);
  //   console.log(shortestAr);
  const asciiOfa = "a".charCodeAt(0);
  let str = "";
  for (let i = shortestAr.length - 1; i >= 0; i--) {
    str += String.fromCharCode(shortestAr[i] + asciiOfa);
  }
  return str;
}
console.log(smallestFromLeaf(arrayToTree([2, 2, 1, null, 1, 0, null, 0])));

// const getShortestAr = (first: number[], second: number[]) => {
//   if (first === second) {
//     return first;
//   }
//   let len = Math.max(first.length, second.length);
//   for (let i = len - 1; i >= Math.abs(first.length - second.length); i--) {
//     if (first[i] === second[i]) {
//       continue;
//     }
//     return first[i] > second[i] ? second : first;
//   }
//   // contents of Array is same here.
//   if (first.length === second.length) {
//     return first;
//   }
//   // If we have lower
//   if (first.length > second.length) {
//     let t = first;
//     first = second;
//     second = t;
//   }
//   return second[first.length - 2] < second[first.length - 1] ? second : first;
// };
