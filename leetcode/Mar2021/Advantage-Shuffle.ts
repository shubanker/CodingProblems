/**
Advantage Shuffle
Given two arrays A and B of equal size, the advantage of A with respect to B is the number of indices i for which A[i] > B[i].

Return any permutation of A that maximizes its advantage with respect to B.

 

Example 1:

Input: A = [2,7,11,15], B = [1,10,4,11]
Output: [2,11,7,15]
Example 2:

Input: A = [12,24,8,32], B = [13,25,32,11]
Output: [24,32,8,12]
 

Note:

1 <= A.length = B.length <= 10000
0 <= A[i] <= 10^9
0 <= B[i] <= 10^9
 */

function advantageCount(A: number[], B: number[]): number[] {
  const op: number[] = [];
  const takenIndex = new Set<number>();
  A.sort((a, b) => a - b);
  const revesitIndex = [];
  B.forEach((num) => {
    //Find the least number in A which is greater than A and is not taken already.
    let index = binarySearch(A, num);
    while (A[index] <= num || takenIndex.has(index)) {
      index++;
    }
    if (index < A.length) {
      takenIndex.add(index);
    } else {
      revesitIndex.push(op.length); //We coudnt find a suitable candidate for this we can put left overs later.
    }
    op.push(A[index]);
  });

  //Lets fill in index marked to revisit with non used index.
  let i = 0;
  while (takenIndex.size < A.length) {
    if (!takenIndex.has(i)) {
      takenIndex.add(i);
      op[revesitIndex.pop()] = A[i];
    }
    i++;
  }
  return op;
}
const binarySearch = (ar: number[], needle: number) => {
  let low = 0,
    high = ar.length - 1,
    mid = 0;
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    if (ar[mid] === needle) {
      break;
    }
    if (ar[mid] > needle) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return mid;
};

// Ans => [15448,13574,6475,19893,14234]
console.log(advantageCount([15448, 14234, 13574, 19893, 6475], [14234, 6475, 19893, 15448, 13574]));

// console.log(advantageCount([12, 24, 8, 32], [13, 25, 32, 11]));
// console.log(advantageCount([2, 7, 11, 15], [1, 10, 4, 11]));

//Faster algo
function advantageCount_(A: number[], B: number[]): number[] {
  A.sort((a, b) => a - b);
  const C = B.slice().sort((a, b) => a - b);
  let a = 0;
  let c = 0;
  const answers: Record<number, number[]> = {};
  const rest: number[] = [];

  while (a < A.length && c < C.length) {
    if (A[a] > C[c]) {
      if (answers[C[c]] === undefined) {
        answers[C[c]] = [A[a]];
      } else {
        answers[C[c]].push(A[a]);
      }
      c++;
    } else if (A[a] <= C[c]) {
      rest.push(A[a]);
    }
    a++;
  }

  return B.map((b) => {
    const c = (answers[b] || []).pop();
    return c === undefined ? rest.pop() : c;
  });
}
