/**
    Implement an LRU (Least Recently Used) cache.
    It should be able to be initialized with a cache size n, and contain the following methods:

    set(key, value): sets key to value. If there are already n items in the cache and we are adding a new item,
    then it should also remove the least recently used item.
    get(key): gets the value at key. If no such key exists, return null.
    Each operation should run in O(1) time.
 */
export class LRU {
  private cacheMap: Record<string, LRUNode> = {};
  private nodesCount: number = 0;
  private head: LRUNode;
  private tail: LRUNode;

  constructor(private cacheSize: number) {}
  set(key: string, value: any) {
    if (this.nodesCount >= this.cacheSize && this.cacheMap[key] === void 0) {
      this.clearLastUsed();
    } else {
      this.nodesCount++;
    }
    const node = this.cacheMap[key] || this.createNode();
    if (this.nodesCount === 1) {
      this.tail = node;
    }
    node.value = value;
    node.key = key;
    this.cacheMap[key] = node;
    this.moveToTop(node);
  }
  get(key: string) {
    if (this.cacheMap[key]) {
      this.moveToTop(this.cacheMap[key]);
      return this.cacheMap[key].value;
    }
  }
  private moveToTop(node: LRUNode) {
    if (node.next && node.previous) {
      node.previous.next = node.next;
      node.next.previous = node.previous;
    }
    if (node === this.tail && node.next) {
      this.tail = node.next;
    }
    node.next = null;
    if (this.head) {
      node.previous = this.head;
      this.head.next = node;
    }
    this.head = node;
  }
  private clearLastUsed() {
    if (this.tail) {
      delete this.cacheMap[this.tail.key];
      this.tail = this.tail.next;
      if (this.tail) {
        this.tail.previous = null;
      }
    }
  }
  private createNode(): LRUNode {
    return {
      key: null,
      next: null,
      previous: null,
      value: null,
    };
  }
}
interface LRUNode {
  next: LRUNode;
  previous: LRUNode;
  key: string;
  value: any;
}
