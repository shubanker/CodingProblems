/**
Merge Two Sorted Lists
Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

 

Example 1:


Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: l1 = [], l2 = []
Output: []
Example 3:

Input: l1 = [], l2 = [0]
Output: [0]
 

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both l1 and l2 are sorted in non-decreasing order.
 */
{
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
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let shorterNode: ListNode | null = null;
    if (l1 || l2) {
      if (!l1) {
        shorterNode = l2;
      } else if (!l2) {
        shorterNode = l1;
      } else {
        shorterNode = l1.val <= l2.val ? l1 : l2;
      }
    }
    if (l1 && l1 === shorterNode) {
      l1 = l1.next;
    } else if (l2) {
      l2 = l2.next;
    }
    if (shorterNode) {
      shorterNode.next = mergeTwoLists(l1, l2);
    }
    return shorterNode;
  }
}
