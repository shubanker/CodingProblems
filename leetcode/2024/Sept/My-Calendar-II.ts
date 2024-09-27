/**
 * My Calendar II
You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a triple booking.

A triple booking happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendarTwo class:

MyCalendarTwo() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.
 

Example 1:

Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]

Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
 

Constraints:

0 <= start < end <= 109
At most 1000 calls will be made to book.
 */
class MyCalendarTwo {
  bookings: number[][] = [];
  constructor() {}
  overlaps = [];
  calendar = [];
  book(start: number, end: number): boolean {
    for (let date of this.overlaps) {
      if (start < date[1] && end > date[0]) return false;
    }

    for (let date of this.calendar) {
      if (start < date[1] && end > date[0]) {
        this.overlaps.push([Math.max(date[0], start), Math.min(date[1], end)]);
      }
    }
    this.calendar.push([start, end]);
    return true;
  }
  book_(start: number, end: number, startIndex = 0): boolean {
    for (let i = startIndex; i < this.bookings.length; i++) {
      let biggerBlock = this.bookings[i],
        smallBlock = [start, end];
      if (biggerBlock[1] - biggerBlock[0] < smallBlock[1] - smallBlock[0]) {
        [biggerBlock, smallBlock] = [smallBlock, biggerBlock];
      }
      if (
        (smallBlock[0] >= biggerBlock[0] && smallBlock[0] < biggerBlock[1]) ||
        (smallBlock[1] > biggerBlock[0] && smallBlock[1] < biggerBlock[1])
      ) {
        if (startIndex || !this.book_(Math.max(biggerBlock[0], smallBlock[0]), Math.min(biggerBlock[1], smallBlock[1]), i + 1)) {
          return false; //fount another overlap.
        }
      }
    }
    !startIndex && this.bookings.push([start, end]);
    return true;
  }
}

var obj = new MyCalendarTwo();
console.log(
  [
    [10, 20],
    [50, 60],
    [10, 40],
    [5, 15],
    [5, 10],
    [25, 55],
  ].map((b) => obj.book(b[0], b[1]))
);
