/**
Palindrome Linked List
Given the head of a singly linked list, return true if it is a palindrome.

 

Example 1:


Input: head = [1,2,2,1]
Output: true
Example 2:


Input: head = [1,2]
Output: false
 

Constraints:

The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9
 

Follow up: Could you do it in O(n) time and O(1) space?
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

import { runTests } from "../../test";

{
  function isPalindrome(head: ListNode | null): boolean {
    let iterator = head,
      iterator2x = head;
    let mid: ListNode = null;
    while (iterator2x?.next) {
      mid = iterator;
      iterator2x = iterator2x.next.next;
      iterator = iterator.next;
    }
    if (!mid) {
      return true;
    }
    mid.next = null;

    let curr = iterator;
    let next = null,
      prev = null;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    iterator = head;
    let iterator2: ListNode = prev;
    while (iterator) {
      if (iterator.val !== iterator2.val) {
        return false;
      }
      iterator = iterator.next;
      iterator2 = iterator2.next;
    }
    return true;
  }
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
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

  console.log(isPalindrome(artoLsit([1, 2, 3, 3, 2, 1])));
  console.log(isPalindrome(artoLsit([1, 2, 3, 4, 5, 4, 3, 2, 1])));
}
