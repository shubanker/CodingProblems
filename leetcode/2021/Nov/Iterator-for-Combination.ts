/**
Iterator for Combination
Design the CombinationIterator class:

CombinationIterator(string characters, int combinationLength) Initializes the object with a string characters of sorted distinct lowercase English letters and a number combinationLength as arguments.
next() Returns the next combination of length combinationLength in lexicographical order.
hasNext() Returns true if and only if there exists a next combination.


Example 1:

Input
["CombinationIterator", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[["abc", 2], [], [], [], [], [], []]
Output
[null, "ab", true, "ac", true, "bc", false]

Explanation
CombinationIterator itr = new CombinationIterator("abc", 2);
itr.next();    // return "ab"
itr.hasNext(); // return True
itr.next();    // return "ac"
itr.hasNext(); // return True
itr.next();    // return "bc"
itr.hasNext(); // return False
Constraints:

1 <= combinationLength <= characters.length <= 15
All the characters of characters are unique.
At most 104 calls will be made to next and hasNext.
It's guaranteed that all calls of the function next are valid.
 */
class CombinationIterator {
  private iterator: Iterator<string[]>;
  private peek: string[] | undefined;
  constructor(private characters: string, private combinationLength: number) {
    this.iterator = CombinationIterator.getCombos(characters, combinationLength)[Symbol.iterator]();
    this.peek = this.iterator.next().value;
  }

  next(): string {
    const val = this.peek.join("");
    this.peek = this.iterator.next().value;
    return val;
  }

  hasNext(): boolean {
    return this.peek !== undefined;
  }
  private static *getCombos(characters: string, combinationLength: number, offset: number = 0): Iterable<string[]> {
    if (combinationLength === 0) {
      yield [];
      return;
    }
    for (let i = offset; i < characters.length; i++) {
      const char = characters[i];
      for (const combo of CombinationIterator.getCombos(characters, combinationLength - 1, i + 1)) {
        yield [char, ...combo];
      }
    }
  }
}
