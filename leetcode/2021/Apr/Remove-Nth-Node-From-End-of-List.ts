import { arrToListNode, ListNode } from "../../_includes/listNode";
/**
Remove Nth Node From End of List
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Follow up: Could you do this in one pass?

 

Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
 

Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (n == 0 || head == null) return head;
  if (n == 1 && head.next == null) return null;
  let fastIterator = head;
  for (let index = 0; index < n; index++) {
    fastIterator = fastIterator.next;
  }
  if (!fastIterator) {
    return head.next;
  }
  let iterator = head;
  while (fastIterator?.next) {
    fastIterator = fastIterator.next;
    iterator = iterator.next;
  }
  iterator.next = iterator.next.next;
  return head;
}
console.log(removeNthFromEnd(arrToListNode([1, 2, 3, 4, 5]), 2));
console.log(removeNthFromEnd(arrToListNode([1, 2, 3]), 3));
