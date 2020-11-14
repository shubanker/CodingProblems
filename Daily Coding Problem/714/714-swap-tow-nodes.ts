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
