import { RotateList } from "./699 - rotate Linked List";

const list = [7, 7, 3, 5];
const linkedList = RotateList.createList(list);
const rotatedList = RotateList.rotate(linkedList, 2);
console.log(RotateList.toArray(rotatedList));

console.log(
  RotateList.toArray(
    RotateList.rotate(RotateList.createList([1, 2, 3, 4, 5]), 3)
  )
);
