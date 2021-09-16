import { runTests } from "../../test";

/**
Zuma Game

Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.

Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.

Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.

 

Example 1:

Input: board = "WRRBBW", hand = "RB"
Output: -1
Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW
Example 2:

Input: board = "WWRRBBWW", hand = "WRBRW"
Output: 2
Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty
Example 3:

Input: board = "G", hand = "GGGGG"
Output: 2
Explanation: G -> G[G] -> GG[G] -> empty 
Example 4:

Input: board = "RBYYBBRRB", hand = "YRBGB"
Output: 3
Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty 
 

Constraints:

You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.
1 <= board.length <= 16
1 <= hand.length <= 5
Both input strings will be non-empty and only contain characters 'R','Y','B','G','W'.

Attempts:
https://leetcode.com/submissions/detail/452822215/
https://leetcode.com/submissions/detail/452848017/

Final:
https://leetcode.com/submissions/detail/453143719/

Sol:
https://leetcode.com/problems/zuma-game/discuss/997252/JavaScript-Dijkstra's
 */
let minFind: number;
const memo = new Set<number>();
function findMinStep(board: string, hand: string): number {
  minFind = Infinity;
  const hands = hand.split("");
  memo.clear();
  findMinBoard(board.split(""), hands, 0);
  if (minFind === Infinity) {
    return -1;
  }
  return minFind;
}
const hashString = (str: string) => {
  let hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
const getMemoKey = (boards: string[], hands: string[]) => {
  const handsMap = hands.reduce((a, b) => {
    if (!a[b]) {
      a[b] = 0;
    }
    a[b]++;
    return a;
  }, {});
  return hashString(boards.join(",") + Object.keys(handsMap).join(",")); // +Object.values(handsMap).join(",") +
};
const findMinBoard = (boards: string[], hands: string[], count: number) => {
  const memoKey = getMemoKey(boards, hands);
  if (memo.has(memoKey)) {
    return;
  }
  let counter = 1,
    lastChar = "";
  boards.push("temp");
  for (let i = 0; i < boards.length; i++) {
    if (boards[i] !== lastChar) {
      lastChar = boards[i];
      if (counter > 2) {
        boards.splice(i - counter, counter);
        i -= counter;
        counter = 1;
        while (boards[i - counter] === lastChar) {
          counter++;
        }
      } else {
        counter = 1;
      }
    } else {
      counter++;
    }
  }
  boards.pop();
  if (boards.length === 0) {
    minFind = count;
    return;
  }
  if (hands.length == 0) {
    return;
  }
  hands.forEach((h, hi) => {
    const handsClone = hands.filter((_, i) => i !== hi);
    let lastChar: string = null;
    for (let bi = 0; bi < boards.length; bi++) {
      const b = boards[bi];
      if (minFind <= count + 1) {
        break;
      }
      if (b !== lastChar) {
        const boardsCloned = [...boards];
        boardsCloned.splice(bi, 0, h);
        findMinBoard(boardsCloned, handsClone, count + 1);
        lastChar = h;
      }
    }
  });
  memo.add(memoKey);
};

/**
 * Unsucess Attempts.
 */

interface boardType {
  char: string;
  count: number;
}

//Greedy attempt
function findMinStep_greedy(board: string, hand: string): number {
  minFind = Infinity;
  const hands = hand.split("");
  let lastCharData: boardType = { char: board.charAt(0), count: 1 };
  let boards: boardType[] = [];

  for (let i = 1; i < board.length; i++) {
    if (board.charAt(i) === lastCharData.char) {
      lastCharData.count++;
    } else {
      boards.push(lastCharData);
      lastCharData = { char: board.charAt(i), count: 1 };
    }
  }
  boards.push(lastCharData);
  findMinBoard_greedy(boards, hands, 0);
  if (minFind === Infinity) {
    return -1;
  }
  return minFind;
}
const findMinBoard_greedy = (boards: boardType[], hands: string[], count: number) => {
  if (minFind < count) {
    return -1;
  }
  for (let i = 0; i < boards.length; i++) {
    if (boards[i].count === 0 || boards[i].count > 2) {
      let spliceCount = 1;
      if (boards[i - 1] && boards[i - 1]?.char == boards[i + 1]?.char) {
        spliceCount++;
        boards[i - 1] = { ...boards[i - 1] };
        boards[i - 1].count += boards[i + 1].count;
      }
      boards.splice(i, spliceCount);
      i -= spliceCount;
    }
  }
  if (boards.length == 0) {
    minFind = count;
    return count;
  }
  const sortedBoards = [...boards];
  sortedBoards.sort((a, b) => b.count - a.count);
  sortedBoards.forEach((b) => {
    const i = boards.indexOf(b);
    if (minFind > count + 1) {
      const handIndex = hands.findIndex((h) => h == b.char);
      if (handIndex + 1) {
        const boardsClone = [...boards];
        boardsClone[i] = { ...b };
        boardsClone[i].count++;

        const handsClone = hands.filter((_, i) => i !== handIndex);
        findMinBoard_greedy(boardsClone, handsClone, count + 1);
      }
    }
  });
  return -1;
};
function findMinStep_direct(board: string, hand: string): number {
  const handAr = hand.split("");
  let lastCharData: boardType = { char: board.charAt(0), count: 1 };
  let boards: boardType[] = [];

  for (let i = 1; i < board.length; i++) {
    if (board.charAt(i) === lastCharData.char) {
      lastCharData.count++;
    } else {
      boards.push(lastCharData);
      lastCharData = { char: board.charAt(i), count: 1 };
    }
  }
  boards.push(lastCharData);
  let count = 0;
  while (handAr.length && boards.length) {
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].count === 0 || boards[i].count > 2) {
        let spliceCount = 1;
        if (boards[i - 1] && boards[i - 1]?.char == boards[i + 1]?.char) {
          spliceCount++;
          boards[i - 1].count += boards[i + 1].count;
        }
        boards.splice(i, spliceCount);
        i -= spliceCount;
      }
    }
    let ball = boards.find((b) => {
      return b.count === 2 && handAr.includes(b.char);
    });
    if (!ball) {
      ball = boards.find((b) => {
        return b.count === 1 && handAr.includes(b.char);
      });
    }
    if (!ball) {
      break;
    }
    handAr.splice(
      handAr.findIndex((c) => c == ball.char),
      1
    );
    count++;
    ball.count++;
  }
  return boards.length ? -1 : count;
}

// console.log(findMinStep("WWBBWBBWW", "BB"));

console.log(
  runTests(
    [
      {
        arguments: ["RBYYBBRRB", "YRBGB"],
        output: 3,
      },
      {
        arguments: ["WWRRBBWW", "WRBRW"],
        output: 2,
      },
      {
        arguments: ["R", "RR"],
        output: 2,
      },
      {
        arguments: ["RRWWRRW", "RR"],
        output: 2,
      },
      {
        arguments: ["WRRBBW", "RB"],
        output: -1,
      },
      {
        arguments: ["RRWWRRBBRR", "WB"],
        output: 2,
      },
      {
        arguments: ["WWBBWBBWW", "BB"],
        output: -1,
        key: "s1",
      },
    ],
    findMinStep
  )
);
