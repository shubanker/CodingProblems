/**
Swapping Nodes in a Linked List
You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

 

Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Example 2:

Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
Example 3:

Input: head = [1], k = 1
Output: [1]
Example 4:

Input: head = [1,2], k = 1
Output: [2,1]
Example 5:

Input: head = [1,2,3], k = 2
Output: [1,2,3]
 

Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 105
0 <= Node.val <= 100
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

function swapNodes(head: ListNode | null, k: number): ListNode | null {
  if (!head) {
    return head;
  }
  let counter = 1;
  let iterator = head;
  let swap1: ListNode = null;
  while (iterator) {
    if (counter === k) {
      swap1 = iterator;
    }
    counter++;
    iterator = iterator.next;
  }
  if (counter < k * 2) {
    counter -= k;
    iterator = head;
  } else {
    iterator = swap1;
    counter -= k * 2 - 1;
  }
  let swap2: ListNode = null;
  while (counter > 0) {
    swap2 = iterator;
    counter--;
    iterator = iterator.next;
  }
  const tem = swap1.val;
  swap1.val = swap2.val;
  swap2.val = tem;
  return head;
}
//Approach 2
function swapNodes2(head: ListNode | null, k: number): ListNode | null {
  let length = 0;
  let currentNode = head;
  let sw1: ListNode = null;
  let sw2: ListNode = null;
  while (currentNode) {
    length++;
    if (sw2) {
      sw2 = sw2.next;
    }
    if (length === k) {
      sw1 = currentNode;
      sw2 = head;
    }
    currentNode = currentNode.next;
  }
  if (sw1 != sw2) {
    const tem = sw1.val;
    sw1.val = sw2.val;
    sw2.val = tem;
  }
  return head;
}
