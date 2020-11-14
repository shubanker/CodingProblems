/**
Given the head of a singly linked list, swap every two nodes and return its head.

For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3
 */

const swapTwoNodes = (head: Nodee) => {
  let current = head,
    previous = head;
  while (current?.next) {
    const nextBlock = current.next.next;
    current.next.next = current;
    if (current === head) {
      head = current.next;
    } else {
      previous.next = current.next;
    }
    previous = current;
    current.next = nextBlock;
    current = previous.next;
  }
  return head;
};
interface Nodee {
  value: number;
  next: Nodee;
}

//Tests.
const array2nodee = (elements: number[]) => {
  let head: Nodee = null,
    last: Nodee = null;
  elements.forEach((value) => {
    const node: Nodee = { value, next: null };
    if (head == null) {
      head = node;
    } else {
      last.next = node;
    }
    last = node;
  });
  return head;
};
const nodeToAr = (root: Nodee) => {
  const elements = [];
  while (root) {
    elements.push(root.value);
    root = root.next;
  }
  return elements;
};
console.log(nodeToAr(swapTwoNodes(array2nodee([1, 2, 3, 4, 5]))));
