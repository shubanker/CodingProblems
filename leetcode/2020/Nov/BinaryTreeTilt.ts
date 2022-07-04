// https://leetcode.com/explore/challenge/card/november-leetcoding-challenge/565/week-2-november-8th-november-14th/3524/
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
  function findTilt(root: TreeNode | null): number {
    return getSumAndTilt(root).tiltSum;
  }
  function getSumAndTilt(node: TreeNode | null): sumAndTilt {
    const op: sumAndTilt = { sum: node?.val || 0, tiltSum: 0 };
    let leftSum = 0,
      rightSum = 0;
    if (node?.left) {
      const leftNode = getSumAndTilt(node?.left);
      leftSum = leftNode.sum;
      op.tiltSum += leftNode.tiltSum;
      op.sum += leftNode.sum;
    }
    if (node?.right) {
      const rightNode = getSumAndTilt(node?.right);
      rightSum = rightNode.sum;
      op.tiltSum += rightNode.tiltSum;
      op.sum += rightNode.sum;
    }
    op.tiltSum += Math.abs(leftSum - rightSum);

    return op;
  }
  interface sumAndTilt {
    sum: number;
    tiltSum: number;
  }

  //Predefined Types
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

  //Test

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

  // console.log(arrayToTree([4, 2, 9, 3, 5, null, 7]));

  console.log(findTilt(arrayToTree([1, 2, 3])));
  console.log(findTilt(arrayToTree([4, 2, 9, 3, 5, null, 7])));
  console.log(findTilt(arrayToTree([21, 7, 14, 1, 1, 2, 2, 3, 3])));
}
