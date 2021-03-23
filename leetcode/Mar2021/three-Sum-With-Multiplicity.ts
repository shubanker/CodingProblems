/**
3Sum With Multiplicity
Given an integer array arr, and an integer target, return the number of tuples i, j, k such that i < j < k and arr[i] + arr[j] + arr[k] == target.

As the answer can be very large, return it modulo 109 + 7.

 

Example 1:

Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation: 
Enumerating by the values (arr[i], arr[j], arr[k]):
(1, 2, 5) occurs 8 times;
(1, 3, 4) occurs 8 times;
(2, 2, 4) occurs 2 times;
(2, 3, 3) occurs 2 times.
Example 2:

Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
Explanation: 
arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
We choose one 1 from [1,1] in 2 ways,
and two 2s from [2,2,2,2] in 6 ways.
 

Constraints:

3 <= arr.length <= 3000
0 <= arr[i] <= 100
0 <= target <= 300
 */
function threeSumMulti(arr: number[], target: number): number {
  let count = 0;
  const modulo = Math.pow(10, 9) + 7;
  const initialMap: Record<number, number> = arr.reduce((a, b) => {
    a[b] ??= 0;
    a[b]++;
    return a;
  }, {});

  for (let i = 0; i < arr.length; i++) {
    initialMap[arr[i]]--;
    if (arr[i] > target) {
      continue;
    }
    const mapClone = { ...initialMap };
    for (let j = arr.length - 1; j > i + 1; j--) {
      mapClone[arr[j]]--;
      const requiredDig = target - arr[i] - arr[j];
      if (mapClone[requiredDig]) {
        count += mapClone[requiredDig];
        count %= modulo;
      }
    }
  }
  return count;
}
console.log(threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8));
