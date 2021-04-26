export class MinHeap {
  heap: number[];
  heapSize: number;
  constructor(array) {
    this.heapSize = array.length;
    this.heap = array;
    this.buildHeap();
  }

  buildHeap() {
    for (let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
      this._heapifyDown(i);
    }
  }

  printHeap() {
    console.log(this.heap);
    return this;
  }

  peekMin() {
    if (!this.heap.length) {
      return;
    }
    return this.heap[0];
  }

  extractMin() {
    if (!this.heap.length) {
      return;
    }
    // get the zero index value ( the min value) from array
    const min = this.heap.shift();
    // place last item in heap at the root
    // get the value of the last item in the heap
    const valueToHeapify = this.heap.pop();
    // place it at the root of the heap
    this.heap.unshift(valueToHeapify);
    // reduce heapsize;
    this.heapSize--;
    // make sure to heapify down
    this._heapifyDown();
    return min;
  }

  insert(value) {
    if (!Number(value)) {
      return;
    }
    this.heap.push(value);
    // increase heapsize
    this.heapSize++;
    return this._heapifyUp();
  }

  _heapifyDown(parentIndex = 0) {
    // When root node gets extracted, we need to place last item at the root
    // then we traverse down the heap to place the item where it should be

    // also used in building heap
    if (!this.heap.length) {
      return;
    }

    let currentParentIndex = parentIndex;
    let heapify = true;

    while (heapify) {
      let currentParentValue = this.heap[currentParentIndex];
      // get smallest child index
      let leftChildIndex = this._getLeftChildIndex(currentParentIndex);
      let leftChildValue = this.heap[leftChildIndex];
      let rightChildIndex = this._getRightChildIndex(currentParentIndex);
      let rightChildValue = this.heap[rightChildIndex];

      let smallestChildIndex;
      // check for undefined children
      if (
        typeof leftChildIndex !== "undefined" &&
        typeof leftChildValue !== "undefined" &&
        typeof rightChildIndex !== "undefined" &&
        typeof rightChildValue !== "undefined"
      ) {
        smallestChildIndex = leftChildValue <= rightChildValue ? leftChildIndex : rightChildIndex;
      } else if (typeof leftChildIndex !== "undefined" && typeof leftChildValue !== "undefined") {
        smallestChildIndex = leftChildIndex;
      } else if (typeof rightChildIndex !== "undefined" && typeof rightChildValue !== "undefined") {
        smallestChildIndex = rightChildIndex;
      }

      if (typeof smallestChildIndex !== "undefined" && currentParentValue > this.heap[smallestChildIndex]) {
        // swap smallest child with current index of value to heapify
        this.heap[currentParentIndex] = this.heap[smallestChildIndex];
        this.heap[smallestChildIndex] = currentParentValue;
        currentParentIndex = smallestChildIndex;
      } else {
        heapify = false;
      }
    }
  }

  _heapifyUp() {
    // When an item is added to the heap.
    // Must traverse up the heap to place the item where it needs to be
    if (!this.heap.length) {
      return;
    }

    // get the last item's index
    let currentChildIndex = this.heap.length - 1;
    let heapify = true;

    while (heapify) {
      let currentChildValue = this.heap[currentChildIndex];
      // need parent's index and value
      let parentIndex = this._getParentIndex(currentChildIndex);

      if (currentChildValue < this.heap[parentIndex]) {
        //  swap the child with the parent
        this.heap[currentChildIndex] = this.heap[parentIndex];
        this.heap[parentIndex] = currentChildValue;
        currentChildIndex = parentIndex;
      } else {
        heapify = false;
      }
    }
    return this;
  }

  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  _getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  _getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
}
