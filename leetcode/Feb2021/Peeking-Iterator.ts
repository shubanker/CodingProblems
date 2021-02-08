/**
Peeking-Iterator
Given an Iterator class interface with methods: next() and hasNext(), design and implement a PeekingIterator that support the peek() operation -- it essentially peek() at the element that will be returned by the next call to next().

Example:

Assume that the iterator is initialized to the beginning of the list: [1,2,3].

Call next() gets you 1, the first element in the list.
Now you call peek() and it returns 2, the next element. Calling next() after that still return 2. 
You call next() the final time and it returns 3, the last element. 
Calling hasNext() after that should return false.
Follow up: How would you extend your design to be generic and work with all types, not just integer?
 */
/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation
 * class Iterator {
 *      hasNext(): boolean {}
 *
 *      next(): number {}
 * }
 */
{
  class Iterator {
    hasNext(): boolean {
      return false;
    }

    next(): number {
      return 0;
    }
  }

  class PeekingIterator {
    private memo: number = null;
    constructor(private iterator: Iterator) {}

    peek(): number {
      if (!this.memo) {
        this.memo = this.iterator.next();
      }
      return this.memo;
    }

    next(): number {
      if (this.memo) {
        const last = this.memo;
        this.memo = null;
        return last;
      }
      return this.iterator.next();
    }

    hasNext(): boolean {
      return this.memo !== null || this.iterator.hasNext();
    }
  }
}
/**
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(iterator)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */
