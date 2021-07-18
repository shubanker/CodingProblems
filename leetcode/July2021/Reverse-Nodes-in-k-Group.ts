import { arrToListNode, ListNode } from "../_includes/listNode";

/**
Reverse Nodes in k-Group
 
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
Example 3:

Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]
Example 4:

Input: head = [1], k = 1
Output: [1]
 

Constraints:

The number of nodes in the list is in the range sz.
1 <= sz <= 5000
0 <= Node.val <= 1000
1 <= k <= sz
 

Follow-up: Can you solve the problem in O(1) extra memory space?
 */
function reverseList(curr: ListNode | null): ListNode | null {
  let prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
function reverseKGroup(head: ListNode | null, k: number) {
  if (!head) return null;
  if (k < 2) return head;

  let tail = head;
  for (let i = 1; i < k; i++) {
    tail = tail.next;
    if (!tail) {
      return head;
    }
  }
  const next = tail.next;
  tail.next = null;
  reverseList(head);
  head.next = reverseKGroup(next, k);
  return tail;
}
console.log(reverseKGroup(arrToListNode([1, 2, 3, 4, 5]), 2));
