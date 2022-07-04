/**
Merge k Sorted Lists
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []
 
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

  function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let head: ListNode = null,
      iterator: ListNode = null;
    while (true) {
      let minNodeIndex: number = null;
      lists.forEach((list, i) => {
        if (list && (minNodeIndex == null || lists[minNodeIndex].val > list.val)) {
          minNodeIndex = i;
        }
      });
      if (minNodeIndex !== null) {
        if (!head) {
          head = iterator = lists[minNodeIndex];
        } else {
          iterator.next = lists[minNodeIndex];
          iterator = iterator.next;
        }
        lists[minNodeIndex] = lists[minNodeIndex].next;

        if (!lists[minNodeIndex]) {
          lists.splice(minNodeIndex, 1); //Optional, clearing off null lists.
        }
      } else {
        break;
      }
    }
    return head;
  }

  /**
   *
   * Testing
   */
  const arrayToNode = (ar: number[]) => {
    let head: ListNode = null;
    let iterator: ListNode = null;
    ar.forEach((d) => {
      const newNode = new ListNode(d);
      if (iterator) {
        iterator.next = newNode;
        iterator = iterator.next;
      } else {
        iterator = newNode;
      }
      if (head == null) {
        head = iterator;
      }
    });
    return head;
  };
  console.log(
    mergeKLists(
      [
        [1, 4, 5],
        [1, 3, 4],
        [2, 6],
      ].map(arrayToNode)
    )
  );
}
