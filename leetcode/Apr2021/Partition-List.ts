/**
Partition List
Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.

 

Example 1:


Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:

Input: head = [2,1], x = 2
Output: [1,2]
 

Constraints:

The number of nodes in the list is in the range [0, 200].
-100 <= Node.val <= 100
-200 <= x <= 200
 */

{
  function partition(head: ListNode | null, x: number): ListNode | null {
    if (!head) {
      return head;
    }
    let iterator = head;
    let newHead = head.val < x ? head : null;
    let prev = iterator; //get this before iterator.

    while (iterator?.val < x) {
      prev = iterator;
      iterator = iterator.next;
    }
    const part = iterator;
    while (iterator?.next) {
      if (iterator.next.val < x) {
        if (!newHead) {
          newHead = iterator.next;
          prev = newHead;
        }
        const inext = iterator.next;
        iterator.next = iterator.next.next;

        prev.next = inext;
        prev = inext;
        inext.next = part;
      } else {
        iterator = iterator.next;
      }
    }
    return newHead ?? head;
  }
  const artoLsit = (ar: number[]) => {
    let head: ListNode;
    let current: ListNode;
    ar.forEach((item) => {
      const node = new ListNode(item);
      if (!head) {
        head = node;
        current = head;
      } else {
        current.next = node;
        current = node;
      }
    });
    return head;
  };
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  console.log(partition(artoLsit([1, 4, 3, 0, 2, 5, 2]), 3));
  console.log(partition(artoLsit([9, 1, 4, 2, 6, 3, 6, 2, 5, 3]), 4));
  console.log(partition(artoLsit([1, 4, 3, 2, 5, 2]), 3));
}
