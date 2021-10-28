/**
3Sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
 

Constraints:

0 <= nums.length <= 3000
-10^5 <= nums[i] <= 10^5
 */
function threeSum(nums: number[]): number[][] {
  const numMap = new Map<number, number>();
  //Generates a unique string from inputes irrespective of order of inputs.
  const genUniqueHashWithoutOrder = (...items) => {
    let and = items[0];
    let or = items[0];
    let xor = items[0];
    let prod = items[0] || 1;
    for (let i = 1; i < items.length; i++) {
      and &= items[i];
      or |= items[i];
      xor ^= items[i];
      prod *= items[i] || 1;
    }
    return `${and}.${or}.${xor}.${prod}`;
  };
  nums.forEach((n) => {
    numMap.set(n, (numMap.get(n) ?? 0) + 1);
  });
  const opMap = new Map<string, number[]>();
  for (let [item, count] of numMap) {
    numMap.set(item, count - 1);
    for (let [item2, count2] of numMap) {
      if (count2 > 0) {
        numMap.set(item2, count2 - 1);
        const remainder = -(item + item2);
        if (numMap.has(remainder) && numMap.get(remainder) > 0) {
          const key = genUniqueHashWithoutOrder(item, item2, remainder);
          if (!opMap.has(key)) {
            opMap.set(key, [item, item2, remainder]);
          }
        }
        numMap.set(item2, count2);
      }
    }
    numMap.set(item, count);
  }
  return [...opMap.values()];
}

//with trai
function threeSum__(nums: number[]): number[][] {
  const numMap = new Map<number, number>();
  const trai = new Map<number, any>();
  nums.forEach((n) => {
    numMap.set(n, (numMap.get(n) ?? 0) + 1);
  });
  for (let [item, count] of numMap) {
    numMap.set(item, count - 1);
    for (let [item2, count2] of numMap) {
      if (count2 > 0) {
        numMap.set(item2, count2 - 1);
        const remainder = -(item + item2);
        if (numMap.has(remainder) && numMap.get(-(item + item2)) > 0) {
          const arr = [item, item2, remainder].sort((a, b) => a - b);
          arr.forEach(
            ((curr: Map<number, any>) => (n, i) => {
              if (!curr.has(n)) {
                curr.set(n, i < 2 ? new Map() : null);
              }
              curr = curr.get(n);
            })(trai)
          );
        }
        numMap.set(item2, count2);
      }
    }
    numMap.set(item, count);
  }
  const op: number[][] = [];
  for (let [n1, map2] of trai) {
    for (let [n2, map3] of map2) {
      for (let [n3] of map3) {
        op.push([n1, n2, n3]);
      }
    }
  }
  return op;
}

//With String
function threeSum_(nums: number[]): number[][] {
  const numMap = new Map<number, number>();
  //   const trai = {};
  const res = new Set<string>();
  nums.forEach((n) => {
    numMap.set(n, (numMap.get(n) ?? 0) + 1);
  });
  for (let [item, count] of numMap) {
    numMap.set(item, count - 1);
    for (let [item2, count2] of numMap) {
      if (count2 > 0) {
        numMap.set(item2, count2 - 1);
        const remainder = -(item + item2);
        if (numMap.has(remainder) && numMap.get(-(item + item2)) > 0) {
          res.add([item, item2, -(item + item2)].sort().join(","));
        }
        numMap.set(item2, count2);
      }
    }
    numMap.set(item, count);
  }
  return [...res].map((r) => r.split(",").map((r) => +r));
}
console.log(threeSum([0, 0]));
