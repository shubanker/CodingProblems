import { arrToListNode, ListNode } from "../_includes/listNode";
/**
Reverse Linked List II
Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]
 

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
 

Follow up: Could you do it in one pass?
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

function reverseBetween_(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left == right) {
    return head;
  }
  let pointLeft: ListNode = null;
  let current = head;
  let i = 0;
  while (current && i < left) {
    pointLeft = current;
    current = current.next;
    i++;
  }
  let tem: ListNode = pointLeft;
  while (current && i < right) {
    const t = current.next;
    current.next = tem;
    current = t;
    tem = current;
    i++;
  }
  pointLeft.next = tem;
  return head;
}
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left == right) {
    return head;
  }
  let i = 1;
  let preLeft: ListNode = head;

  while (i < left - 1) {
    preLeft = preLeft.next;
    i++;
  }
  let leftNext = preLeft.next;
  let prev = leftNext;
  let next = prev.next;
  leftNext.next = null;

  while (i < right - 1) {
    const tem = next.next;
    next.next = prev;
    prev = next;
    next = tem;
    i++;
  }
  preLeft.next = prev;
  leftNext.next = next;

  return head;
}
console.log(reverseBetween(arrToListNode([1, 2, 3, 4, 5]), 2, 4));
