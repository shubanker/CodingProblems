export class Heap {
  private data: number[] = [];
  constructor(private type: "min" | "max") {
    this.type = type;
    this.data[0] = undefined;
  }
  getSize() {
    return this.data.length - 1;
  }
  insert(value: number) {
    this.data.push(value);
    if (this.data.length == 2) {
      return;
    }
    let lastIndex = this.data.length - 1;
    while (
      this.data[Math.floor(lastIndex / 2)] !== undefined &&
      this.compare(this.data[lastIndex], this.data[Math.floor(lastIndex / 2)]) > 0
    ) {
      let temp = this.data[Math.floor(lastIndex / 2)];
      this.data[Math.floor(lastIndex / 2)] = this.data[lastIndex];
      this.data[lastIndex] = temp;
      lastIndex = Math.floor(lastIndex / 2);
    }
  }
  //This returns a positive number if a is greater than b. Here meaing of being greater depends on the type of heap. For max heap it will return positive number if a>b and for min heap it will return positive number if a<b .
  compare(a: number, b: number) {
    if (this.type === "min") {
      return b - a;
    } else {
      return a - b;
    }
  }
  removeTop() {
    let max = this.data[1];
    if (this.getSize() > 1) {
      this.data[1] = this.data.pop();
      this.heapify(1);
    } else {
      //If the size is 0 then just remove the element, no shifting and hipify will be applicable
      this.data.pop();
    }
    return max;
  }
  getTop() {
    let max = null;
    if (this.getSize() >= 1) {
      max = this.data[1];
    }
    return max;
  }
  heapify(pos: number) {
    if (pos * 2 > this.data.length - 1) {
      //That means element at index 'pos' is not having any child
      return;
    }
    if (
      (this.data[pos * 2] !== undefined && this.compare(this.data[pos * 2], this.data[pos]) > 0) ||
      (this.data[pos * 2 + 1] !== undefined && this.compare(this.data[pos * 2 + 1], this.data[pos]) > 0)
    ) {
      if (this.data[pos * 2 + 1] === undefined || this.compare(this.data[pos * 2 + 1], this.data[pos * 2]) <= 0) {
        let temp = this.data[pos * 2];
        this.data[pos * 2] = this.data[pos];
        this.data[pos] = temp;
        this.heapify(pos * 2);
      } else {
        let temp = this.data[pos * 2 + 1];
        this.data[pos * 2 + 1] = this.data[pos];
        this.data[pos] = temp;
        this.heapify(pos * 2 + 1);
      }
    }
  }
}
