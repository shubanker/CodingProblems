/**
Maximum Performance of a Team

Solution
You are given two integers n and k and two integer arrays speed and efficiency both of length n. There are n engineers numbered from 1 to n. speed[i] and efficiency[i] represent the speed and efficiency of the ith engineer respectively.

Choose at most k different engineers out of the n engineers to form a team with the maximum performance.

The performance of a team is the sum of their engineers' speeds multiplied by the minimum efficiency among their engineers.

Return the maximum performance of this team. Since the answer can be a huge number, return it modulo 10^9 + 7.

 

Example 1:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: 
We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.
Example 2:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3
Output: 68
Explanation:
This is the same example as the first but k = 3. We can select engineer 1, engineer 2 and engineer 5 to get the maximum performance of the team. That is, performance = (2 + 10 + 5) * min(5, 4, 7) = 68.
Example 3:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 4
Output: 72
 

Constraints:

1 <= <= k <= n <= 10^5
speed.length == n
efficiency.length == n
1 <= speed[i] <= 10^5
1 <= efficiency[i] <= 10^8
 */
function maxPerformance(n: number, speeds: number[], efficiency: number[], k: number): number {
  const workers = new Array(n);
  for (let i = 0; i < n; i++) {
    workers[i] = { speed: BigInt(speeds[i]), efficiency: efficiency[i] };
  }
  workers.sort((a, b) => b.efficiency - a.efficiency);

  let totalSpeed = BigInt(0);
  let max = BigInt(0);
  const heap = new MinHeapMaxPerformance();
  for (let worker of workers) {
    const { speed, efficiency } = worker;
    totalSpeed += speed;

    heap.push(worker);
    if (heap.size() > k) totalSpeed -= heap.pop().speed;
    const total = totalSpeed * BigInt(efficiency);
    if (total > max) max = total;
  }
  return Number(max % BigInt(1000000007));
}

class MinHeapMaxPerformance {
  store = [];
  constructor() {}

  size() {
    return this.store.length;
  }

  isEmpty() {
    return this.store.length === 0;
  }

  push(value) {
    this.store.push(value);
    this.heapifyUp(this.store.length - 1);
  }

  pop() {
    if (this.store.length < 2) return this.store.pop();
    const result = this.store[0];
    this.store[0] = this.store.pop();
    this.heapifyDown(0);
    return result;
  }

  heapifyDown(parent) {
    while (true) {
      let [child, child2] = [1, 2].map((n) => parent * 2 + n).filter((n) => n < this.store.length);
      if (this.shouldSwap(child2, child)) {
        child = child2;
      }
      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [this.store[parent], this.store[child]];
        parent = child;
      } else {
        return parent;
      }
    }
  }

  heapifyUp(child) {
    while (child) {
      const parent = Math.floor((child - 1) / 2);
      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [this.store[parent], this.store[child]];
        child = parent;
      } else {
        return child;
      }
    }
  }

  shouldSwap(child, parent) {
    return child && this.store[child].speed < this.store[parent].speed;
  }
}
