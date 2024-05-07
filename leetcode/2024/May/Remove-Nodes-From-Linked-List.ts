import { ListNode, arrToListNode, ListNodeToAr } from "../../_includes/listNode";
/*
2487. Remove Nodes From Linked List
You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

 

Example 1:


Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
Example 2:

Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
 

Constraints:

The number of the nodes in the given list is in the range [1, 105].
1 <= Node.val <= 105
 */
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

let reverseList = function (head: ListNode | null) {
  let prev: ListNode = null,
    next = null;
  while (head) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};

function removeNodes(head: ListNode | null): ListNode | null {
  const newHead = reverseList(head);
  let current = newHead;
  while (current) {
    if (current.next && current.next.val < current.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return reverseList(newHead);
}

console.log(ListNodeToAr(removeNodes(arrToListNode([5, 2, 13, 3, 8]))));
