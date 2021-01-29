/**
Vertical Order Traversal of a Binary Tree
Given the root of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position (x, y), its left and right children will be at positions (x - 1, y - 1) and (x + 1, y - 1) respectively.

The vertical order traversal of a binary tree is a list of non-empty reports for each unique x-coordinate from left to right. Each report is a list of all nodes at a given x-coordinate. The report should be primarily sorted by y-coordinate from highest y-coordinate to lowest. If any two nodes have the same y-coordinate in the report, the node with the smaller value should appear earlier.

Return the vertical order traversal of the binary tree.

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation: Without loss of generality, we can assume the root node is at position (0, 0):
The node with value 9 occurs at position (-1, -1).
The nodes with values 3 and 15 occur at positions (0, 0) and (0, -2).
The node with value 20 occurs at position (1, -1).
The node with value 7 occurs at position (2, -2).
Example 2:


Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation: The node with value 5 and the node with value 6 have the same position according to the given scheme.
However, in the report [1,5,6], the node with value 5 comes first since 5 is smaller than 6.
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 1000
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
  {
    //BFS Approach
    interface nodeWithCordinates {
      x: number;
      y: number;
      node: TreeNode | null;
    }
    const verticalTraversal = (root: TreeNode | null) => {
      const verticalMap = new Map<number, nodeWithCordinates[]>();
      let stack: nodeWithCordinates[] = [{ x: 0, y: 0, node: root }];
      let y = 0;
      while (stack.length) {
        const childs: nodeWithCordinates[] = [];
        stack.forEach((n) => {
          const { x, node, y } = n;
          if (node) {
            if (!verticalMap.has(x)) {
              verticalMap.set(x, []);
            }
            verticalMap.get(x).push(n);

            childs.push({ x: x - 1, node: node.left, y: y - 1 });
            childs.push({ x: x + 1, node: node.right, y: y - 1 });
          }
        });
        stack = childs;
      }
      const xAxis = [...verticalMap.keys()].sort((a, b) => a - b);
      const op: number[][] = [];
      xAxis.forEach((x) => {
        const n = verticalMap.get(x);
        op.push(
          n
            .sort((a, b) => {
              if (a.y === b.y) {
                return a.node.val - b.node.val;
              }
              return b.y - a.y;
            })
            .map((x) => x.node.val)
        );
      });
      return op;
    };
  }
  {
    //DFS Approach..
    const verticalMap = new Map<number, number[]>();
    const verticalTraversal = (root: TreeNode | null) => {
      verticalMap.clear();
      traverseNode(root, 0);
      const xAxis = [...verticalMap.keys()].sort((a, b) => a - b);
      const op: number[][] = [];
      xAxis.forEach((x) => {
        op.push(verticalMap.get(x));
      });
      return op;
    };
    const traverseNode = (node: TreeNode | null, x: number) => {
      if (!node) {
        return;
      }
      if (!verticalMap.has(x)) {
        verticalMap.set(x, []);
      }
      verticalMap.get(x).push(node.val);

      traverseNode(node.left, x - 1);
      traverseNode(node.right, x + 1);
    };
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
}
