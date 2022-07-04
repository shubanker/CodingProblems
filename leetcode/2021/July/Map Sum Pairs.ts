/**
Map Sum Pairs

Implement the MapSum class:

MapSum() Initializes the MapSum object.
void insert(String key, int val) Inserts the key-val pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.
 

Example 1:

Input
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output
[null, null, 3, null, 5]

Explanation
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 

Constraints:

1 <= key.length, prefix.length <= 50
key and prefix consist of only lowercase English letters.
1 <= val <= 1000
At most 50 calls will be made to insert and sum.
 */

//With Trai
interface MapSumTrai {
  char: string;
  value: number;
  child: Record<string, MapSumTrai>;
}
class MapSum {
  private root: MapSumTrai = {
    char: "",
    value: 0,
    child: {},
  };
  insert(key: string, val: number): void {
    let current = this.root;
    for (let i = 0; i < key.length; i++) {
      if (!current.child[key[i]]) {
        current.child[key[i]] = {
          char: key[i],
          value: 0,
          child: {},
        };
      }
      current = current.child[key[i]];
      if (i === key.length - 1) {
        current.value = val;
      }
    }
  }
  sum(prefix: string): number {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      current = current.child[prefix[i]];
      if (!current) {
        return 0;
      }
    }
    return this.dfsSum(current);
  }
  private dfsSum(node: MapSumTrai): number {
    if (!node) {
      return 0;
    }
    let sum = node.value;
    for (let key in node.child) {
      sum += this.dfsSum(node.child[key]);
    }
    return sum;
  }
}

//With Map (in effecient.)
class MapSum_ {
  private readonly map = new Map();
  constructor() {}

  insert(key: string, val: number): void {
    this.map.set(key, val);
  }

  sum(prefix: string): number {
    let sum = 0;
    for (const [key, value] of this.map) {
      if (key.startsWith(prefix)) {
        sum += value;
      }
    }
    return sum;
  }
}
