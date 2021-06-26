/**
Count of Smaller Numbers After Self
You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].

 

Example 1:

Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Example 2:

Input: nums = [-1]
Output: [0]
Example 3:

Input: nums = [-1,-1]
Output: [0,0]
 

Constraints:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
 */
{
  class FenwickTree {
    sum: number[];
    constructor(n: number) {
      this.sum = Array(n + 1).fill(0);
    }
    lowbit(x: number) {
      return x & -x;
    }
    update(i: number, delta: number) {
      while (i < this.sum.length) {
        this.sum[i] += delta;
        i += this.lowbit(i);
      }
    }
    query(i: number) {
      let res = 0;

      while (i > 0) {
        res += this.sum[i];
        i -= this.lowbit(i);
      }

      return res;
    }
  }

  const countSmaller = (nums: number[]): number[] => {
    const ranks: Record<number, any> = {};
    for (let v of nums) {
      ranks[v] = ranks[v] || 0;
    }

    let rank = 0;
    const keys = Object.keys(ranks);
    for (let k of keys.sort((a, b) => +a - +b)) {
      ranks[k] = ++rank;
    }

    let ans = [];
    const fenwickTree = new FenwickTree(keys.length);

    for (let i = nums.length - 1; i >= 0; i--) {
      ans.push(fenwickTree.query(ranks[nums[i]] - 1));
      fenwickTree.update(ranks[nums[i]], 1);
    }

    return ans.reverse();
  };
}

//Timeout
{
  const countSmaller = (nums: number[]): number[] => {
    const bst = new BST(nums[nums.length - 1]);
    const op = Array(nums.length).fill(0);
    for (let i = nums.length - 2; i >= 0; i--) {
      op[i] = bst.insert(nums[i]);
    }
    return op;
  };
  class BST {
    left: BST = null;
    right: BST = null;
    constructor(private value: number, private size = 0) {}

    insert(v: number, s = 0): number {
      if (v > this.value) {
        if (this.right == null) {
          this.right = new BST(v);
          return this.size + s + 1;
        } else {
          return this.right.insert(v, s + this.size + 1);
        }
      } else {
        this.size++;
        if (this.left == null) {
          this.left = new BST(v);
          return s;
        } else {
          return this.left.insert(v, s);
        }
      }
    }
  }
}
//Incorrect logic
function countSmaller_(nums: number[]): number[] {
  const op = Array(nums.length).fill(0);
  let minTillNow = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] > minTillNow) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] >= nums[j]) {
          op[i] = op[j] + (nums[i] == nums[j] ? 0 : 1);
          break;
        }
      }
    }
    minTillNow = Math.min(minTillNow, nums[i]);
  }
  return op;
}
