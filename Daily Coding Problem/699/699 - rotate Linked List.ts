/**
    Given a linked list and a positive integer k, rotate the list to the right by k places.

    For example, given the linked list 7 -> 7 -> 3 -> 5 and k = 2, it should become 3 -> 5 -> 7 -> 7.

    Given the linked list 1 -> 2 -> 3 -> 4 -> 5 and k = 3, it should become 3 -> 4 -> 5 -> 1 -> 2.
 */
export class RotateList {
  static rotate(tail: NODE, k: number) {
    const breakPoint = this.getListLength(tail) - k;
    let breakNode = tail;

    for (let i = 0; i < breakPoint - 1; i++) {
      breakNode = breakNode.next;
    }
    const newTail = breakNode.next;
    breakNode.next = null;
    let previousHead = newTail;
    while (previousHead.next) {
      previousHead = previousHead.next;
    }
    previousHead.next = tail;
    return newTail;
  }
  static getListLength(tail: NODE) {
    let length = 0;
    while (tail) {
      tail = tail.next;
      length++;
    }
    return length;
  }
  static newNode(value: any): NODE {
    return {
      next: null,
      value,
    };
  }
  static createList(list: any[]) {
    let tail: NODE, temp: NODE;
    list.forEach((item) => {
      const newnode = this.newNode(item);
      if (!temp) {
        tail = temp = newnode;
      } else {
        temp.next = newnode;
        temp = newnode;
      }
    });
    return tail;
  }
  static toArray(tail: NODE) {
    const ar = [];
    while (tail) {
      ar.push(tail.value);
      tail = tail.next;
    }
    return ar;
  }
  static toString(tail: NODE) {
    return this.toArray(tail).join(" -> ");
  }
}

export interface NODE {
  next: NODE;
  value: any;
}
