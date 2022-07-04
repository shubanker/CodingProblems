import { MaxPriorityQueue, MinPriorityQueue } from "datastructures-js";
/**
Find Median from Data Stream
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
 

Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.
 

Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
 */

//Accepted, but highly ineffecient due to sort.
class MedianFinder_ {
  private list: number[] = [];
  constructor() {}

  addNum(num: number): void {
    this.list.push(num);
  }

  findMedian(): number {
    this.list.sort((a, b) => a - b);
    const floorIndex = Math.floor(this.list.length / 2);
    if (this.list.length % 2 == 1) {
      return this.list[floorIndex];
    }
    return (this.list[floorIndex] + this.list[floorIndex + 1]) / 2;
  }
}
//Issue with leetcode, works fine when compiled and used with JS.
class MedianFinder {
  private min = new MinPriorityQueue<number>();
  private max = new MaxPriorityQueue<number>();
  private isEven = true;
  constructor() {}

  addNum(num: number): void {
    let [min, max] = [this.min, this.max];
    if (!this.isEven) {
      [max, min] = [min, max];
    }
    max.enqueue(num);
    min.enqueue(max.dequeue().element);
    this.isEven = !this.isEven;
  }

  findMedian(): number {
    if (!this.isEven) {
      return this.min.front().element;
    }
    return (this.min.front().element + this.max.front().element) / 2;
  }
}
