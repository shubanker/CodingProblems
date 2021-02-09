import { TreeNode } from "./treeNode";

export const arrayToTree = (ar: number[]) => {
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
