/**
Remove Duplicates from Sorted List II
Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

 

Example 1:


Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Example 2:


Input: head = [1,1,1,2,3]
Output: [2,3]
 

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
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

  function deleteDuplicates(head: ListNode | null): ListNode | null {
    let iterator = head,
      previous: ListNode;
    let detachEnd = false;
    while (iterator) {
      if ((detachEnd = iterator.val === iterator.next?.val)) {
        const isHead = iterator === head;
        while (iterator.val === iterator.next?.val) {
          iterator = iterator.next;
        }
        if (isHead) {
          head = iterator.next;
        }
      } else {
        if (previous) {
          previous.next = iterator;
          previous = previous.next;
        } else {
          previous = iterator;
        }
      }
      iterator = iterator.next;
    }
    if (detachEnd) {
      if (previous) {
        previous.next = null;
      } else {
        return null;
      }
    }
    return head;
  }
  function arToList(nums: number[]) {
    let head: ListNode = null,
      iterator: ListNode;
    nums.forEach((i) => {
      const node = new ListNode(i);
      if (head) {
        iterator.next = node;
      } else {
        head = node;
      }
      iterator = node;
    });
    return head;
  }
  //   console.log(deleteDuplicates(arToList([1, 1, 2, 3, 3, 4, 4, 5])));
  console.log(deleteDuplicates(arToList([1, 2, 2])));
}
