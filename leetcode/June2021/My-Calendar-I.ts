import { runTests } from "../../test";
/**
My Calendar I
Implement a MyCalendar class to store your events. A new event can be added if adding the event will not cause a double booking.

Your class will have the method, book(int start, int end). Formally, this represents a booking on the half open interval [start, end), the range of real numbers x such that start <= x < end.

A double booking happens when two events have some non-empty intersection (ie., there is some time that is common to both events.)

For each call to the method MyCalendar.book, return true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.

Your class will be called like this: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)
Example 1:

MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(15, 25); // returns false
MyCalendar.book(20, 30); // returns true
Explanation: 
The first event can be booked.  The second can't because time 15 is already booked by another event.
The third event can be booked, as the first event takes every time less than 20, but not including 20.
 

Note:

The number of calls to MyCalendar.book per test case will be at most 1000.
In calls to MyCalendar.book(start, end), start and end are integers in the range [0, 10^9].
 */
class MyCalendar {
  private events: number[][] = [
    [0, 0],
    [Infinity, Infinity],
  ];
  book(start: number, end: number): boolean {
    const events = this.events;

    if (events.length === 2) {
      events.splice(1, 0, [start, end]);
      return true;
    }

    for (let i = events.length - 1; i >= 0; i--) {
      if (events[i][1] <= start && events[i + 1][0] >= end) {
        events.splice(i + 1, 0, [start, end]);
        return true;
      }
    }

    return false;
  }
  book2(start: number, end: number): boolean {
    let left = 0,
      right = this.events.length - 1;
    while (left <= right) {
      let guess = left + Math.floor((right - left) / 2);
      if (this.events[guess][0] < end && this.events[guess][1] > start) {
        return false;
      } else if (this.events[guess][0] < end) {
        left = guess + 1;
      } else {
        right = guess - 1;
      }
    }

    this.events.splice(left, 0, [start, end]);

    return true;
  }
}
class MyCalendar_ {
  private events: { start: number; end: number }[] = [];
  book(start: number, end: number): boolean {
    if (!this.events.length) {
      this.events.push({ end, start });
      return true;
    }
    let pos = this.searchIndex(start);
    while (pos < this.events.length) {
      if (
        (this.events[pos].start <= start && this.events[pos].end > start) ||
        (this.events[pos].start < end && this.events[pos].end >= end)
      ) {
        return false;
      }
      if (this.events[pos].end <= start && (this.events[pos + 1]?.start ?? Number.MAX_SAFE_INTEGER) >= end) {
        break;
      }
      pos++;
    }
    this.events.push({ start, end });
    this.events.sort((a, b) => a.start - b.start);
    return true;
  }
  private searchIndex(start: number) {
    let min = 0,
      max = this.events.length,
      mid = 0;
    while (min < max) {
      mid = min + Math.floor((max - min) / 2);
      if (this.events[mid].start === start) {
        break;
      }
      if (this.events[mid].start > start) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    while (this.events[mid]?.start >= start) {
      mid--;
    }
    return Math.max(0, mid);
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

const casess = [
  [
    [10, 20],
    [15, 25],
    [20, 30],
  ],
  [
    [47, 50],
    [33, 41],
    [39, 45],
    [33, 42],
    [25, 32],
    [26, 35],
    [19, 25],
    [3, 8],
    [8, 13],
    [18, 27],
  ],
  [
    [37, 50],
    [33, 50],
    [4, 17],
    [35, 48],
    [8, 25],
  ],
];
// casess.forEach(case=>{
//     const obj = new MyCalendar();
//     const op = case.map(([start, end]) => obj.book(start, end));
//       console.log(op);
// })
const inpToBoolAr = (inp: number[][]) => {
  const obj = new MyCalendar();
  return inp.map(([start, end]) => obj.book(start, end));
};
const res = runTests(
  [
    {
      arguments: [
        [
          [10, 20],
          [15, 25],
          [20, 30],
        ],
      ],
      output: [true, false, true],
    },
    {
      arguments: [
        [
          [47, 50],
          [33, 41],
          [39, 45],
          [33, 42],
          [25, 32],
          [26, 35],
          [19, 25],
          [3, 8],
          [8, 13],
          [18, 27],
        ],
      ],
      output: [true, true, false, false, true, false, true, true, true, false],
    },
    {
      arguments: [
        [
          [37, 50],
          [33, 50],
          [4, 17],
          [35, 48],
          [8, 25],
        ],
      ],
      output: [true, false, true, false, false],
    },
  ],
  inpToBoolAr,
  (a, b) => a.join("") === b.join(",")
);
console.log(res);
