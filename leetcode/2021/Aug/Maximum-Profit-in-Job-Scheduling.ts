/**
Maximum Profit in Job Scheduling
We have n jobs, where every job is scheduled to be done from startTime[i] to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.

 

Example 1:



Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
Example 2:



Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.
Example 3:



Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6
 

Constraints:

1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
1 <= startTime[i] < endTime[i] <= 10^9
1 <= profit[i] <= 10^4
 */

function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  if (startTime === null || endTime === null || profit === null) {
    return 0;
  }

  const lists = startTime.map((time, index) => {
    return [time, endTime[index], profit[index]];
  });
  lists.sort((a, b) => a[1] - b[1]);
  const dp = [];
  dp[0] = lists[0][2];
  for (let i = 1; i < lists.length; i++) {
    const index = findLowestIndex(lists, i);
    if (lists[index][1] <= lists[i][0]) {
      dp[i] = Math.max(dp[i - 1], dp[index] + lists[i][2]);
    } else {
      dp[i] = Math.max(dp[i - 1], lists[i][2]);
    }
  }
  return dp[lists.length - 1];
}
const findLowestIndex = (lists, i) => {
  let l = 0,
    r = i - 1;
  while (l + 1 < r) {
    let mid = (l + r) >> 1;
    if (lists[mid][1] <= lists[i][0]) {
      l = mid;
    } else {
      r = mid;
    }
  }
  if (lists[r][1] <= lists[i][0]) {
    return r;
  } else {
    return l;
  }
};
