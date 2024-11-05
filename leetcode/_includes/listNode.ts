export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
export const arrToListNode = (ar: number[]) => {
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
export const ListNodeToAr = (head: ListNode) => {
  const ar: number[] = [];
  while (head) {
    ar.push(head.val);
    head = head.next;
  }
  return ar;
};
