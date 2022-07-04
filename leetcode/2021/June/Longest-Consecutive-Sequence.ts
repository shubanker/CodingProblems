/**
Longest Consecutive Sequence
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

 

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 

Constraints:

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
 */
function longestConsecutive(nums: number[]): number {
  const groupedNums = new Map<number, { count: { val: number } }>();
  let maxCount = 0;
  nums.forEach((n) => {
    if (!groupedNums.has(n)) {
      let backCount = groupedNums.get(n - 1);
      let forwardCount = groupedNums.get(n + 1);
      if (forwardCount && backCount) {
        backCount.count.val += forwardCount.count.val;
        let i = n + 1;
        while (groupedNums.has(i)) {
          groupedNums.get(i++).count = backCount.count;
        }
      }
      const currentObj = backCount ?? forwardCount ?? { count: { val: 0 } };
      currentObj.count.val++;
      maxCount = Math.max(maxCount, currentObj.count.val);
      groupedNums.set(n, currentObj);
    }
  });
  return maxCount;
}
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1, 10, -1, 9]));
