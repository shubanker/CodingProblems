/**
 * Definition for singly-linkeAdd Two Numbers IId list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let len1 = getNodeLength(l1);
  const len2 = getNodeLength(l2);
  const sumHead: ListNode = { next: null, val: 0 };
  let sumIterator = sumHead;
  const carryForwardHead: ListNode = { next: null, val: 0 };
  let carryForwardIterator = carryForwardHead;
  //Matching length of both node, adding precedding 0's for shorter list
  if (len1 > len2) {
    l2 = addPrecedingZeros(l2, len1 - len2);
  } else if (len1 < len2) {
    l1 = addPrecedingZeros(l1, len2 - len1);
    len1 = len2;
  }

  let hasCarryForwards = false;

  for (let i = 0; i < len1; i++) {
    //Check is required only to satisfy TS :(
    let sum = l1 && l2 ? l1.val + l2.val : 0;
    if (sum > 9) {
      carryForwardIterator.val = Math.floor(sum / 10);
      sum = sum % 10;
      hasCarryForwards = true;
    }
    sumIterator.val = sum;

    //Check is required only to satisfy Leet code TS
    // l1 = l1 ? l1.next : l1;
    // l2 = l2 ? l2.next : l2;
    l1 = l1.next;
    l2 = l2.next;

    //Don't add next node for sum if we are at last iteration.
    if (i < len1 - 1) {
      sumIterator.next = { next: null, val: 0 };
      sumIterator = sumIterator.next;
    }
    carryForwardIterator.next = { val: 0, next: null };
    carryForwardIterator = carryForwardIterator.next;
  }

  return hasCarryForwards
    ? addTwoNumbers(sumHead, carryForwardHead)
    : removePresedingZeros(sumHead);
}
function addPrecedingZeros(node: ListNode | null, len: number) {
  let head = node;
  for (let index = 0; index < len; index++) {
    const newNode: ListNode = { val: 0, next: head };
    head = newNode;
  }
  return head;
}
function removePresedingZeros(node: ListNode | null) {
  while (node && !node.val) {
    node = node.next;
  }
  return node || { next: null, val: 0 };
}
function getNodeLength(node: ListNode | null) {
  let length = 0;
  let iterator = node;
  while (iterator) {
    length++;
    iterator = iterator.next;
  }
  return length;
}

//Types
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

//Tests
const cases: { node1: number[]; node2: number[] }[] = [
  {
    node1: [7, 2, 4, 3],
    node2: [5, 6, 4],
  },
  {
    node1: [5],
    node2: [5],
  },
  {
    node1: [0],
    node2: [0],
  },
];
cases.forEach((c) => {
  const node1 = arrayToNode(c.node1);
  const node2 = arrayToNode(c.node2);
  const sum = addTwoNumbers(node1, node2);
  console.log(
    `${nodeToString(node1, "")} + ${nodeToString(node2, "")} = ${nodeToString(
      sum,
      ""
    )}`
  );
});

function arrayToNode(ar: number[]) {
  let head: ListNode = null;
  let iterator: ListNode = null;
  ar.forEach((d) => {
    const newNode = { val: d, next: null };
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
}
function nodeToString(node: ListNode, joinStr = " -> ") {
  let op = "";
  while (node) {
    op += node.val;
    if (node.next) {
      op += joinStr;
    }
    node = node.next;
  }
  return op;
}
