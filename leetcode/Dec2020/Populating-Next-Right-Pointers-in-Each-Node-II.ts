/**
Populating Next Right Pointers in Each Node II

Solution
Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

 

Follow up:

You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.
 

Example 1:



Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
 

Constraints:

The number of nodes in the given tree is less than 6000.
-100 <= node.val <= 100
 */
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
{
  const connect: (root: Node | null) => Node | null = (root: Node | null) => {
    let leafs: (Node | null)[] = [root];
    while (leafs.length) {
      const nextLeafs = new Set<Node | null>();
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
  };

  class Node {
    val: number;
    left: Node | null;
    right: Node | null;
    next: Node | null;
    constructor(val?: number, left?: Node, right?: Node, next?: Node) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
      this.next = next === undefined ? null : next;
    }
  }
}
