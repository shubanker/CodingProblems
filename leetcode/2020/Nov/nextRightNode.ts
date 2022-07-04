/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: TreeNode2 | null): TreeNode2 | null {
  let leafs: (TreeNode2 | null)[] = [root];
  while (leafs.length) {
    const nextLeafs = new Set<TreeNode2 | null>();
    for (let i = 0; i < leafs.length; i++) {
      if (leafs[i] !== null) {
        leafs[i].next = leafs[i + 1] || null;
        nextLeafs.add(leafs[i].left);
        nextLeafs.add(leafs[i].right);
      }
    }
    nextLeafs.delete(null);
    leafs = [...nextLeafs];
  }
  return root;
}

class TreeNode2 {
  val: number;
  left: TreeNode2 | null;
  right: TreeNode2 | null;
  next: TreeNode2 | null;
  constructor(val?: number, left?: TreeNode2, right?: TreeNode2, next?: TreeNode2) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}
