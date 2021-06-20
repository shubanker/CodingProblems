/**
A teacher must divide a class of students into two teams to play dodgeball. Unfortunately, not all the kids get along, and several refuse to be put on the same team as that of their enemies.

Given an adjacency list of students and their enemies, write an algorithm that finds a satisfactory pair of teams, or returns False if none exists.

For example, given the following enemy graph you should return the teams {0, 1, 4, 5} and {2, 3}.

students = {
    0: [3],
    1: [2],
    2: [1, 4],
    3: [0, 4, 5],
    4: [2, 3],
    5: [3]
}
On the other hand, given the input below, you should return False.

students = {
    0: [3],
    1: [2],
    2: [1, 3, 4],
    3: [0, 2, 4, 5],
    4: [2, 3],
    5: [3]
}
 */

function divideInGroups(enemiesList: Record<any, any[]>) {
  let enemies = { ...enemiesList };
  let studentsList: any[] = Object.keys(enemies);
  let teamMap: Record<any, "team1" | "team2"> = {};
  do {
    const leftGuys = {};
    for (let i = 0; i < studentsList.length; i++) {
      const student = studentsList[i];
      let studentTeam: "team1" | "team2";
      if (teamMap[student]) {
        studentTeam = teamMap[student];
      } else {
        const oponent = enemies[student].find((st) => teamMap[st]);
        if (oponent) {
          studentTeam = oponent === "team1" ? "team2" : "team1";
        }
      }
      if (!studentTeam) {
        leftGuys[student] = enemies[student];
      } else {
        let okFlag = true;
        if (teamMap[student] && teamMap[student] != studentTeam) {
          okFlag = false;
        } else {
          teamMap[student] = studentTeam;
        }
        const oponent = studentTeam === "team1" ? "team2" : "team1";
        enemies[student].forEach((st) => {
          if (teamMap[st] && teamMap[st] !== oponent) {
            okFlag = false;
          } else {
            teamMap[st] = oponent;
          }
        });
        if (!okFlag) {
          return false;
        }
      }
    }
    if (Object.keys(leftGuys).length === Object.keys(enemies).length) {
      teamMap[studentsList[0]] = "team1";
      enemies[studentsList[0]].forEach((enemy) => {
        teamMap[enemy] = "team2";
      });
    }
    enemies = leftGuys;
    studentsList = Object.keys(leftGuys);
  } while (Object.keys(enemies).length);
  return Object.keys(teamMap).reduce(
    (a, student) => {
      a[teamMap[student]].push(student);
      return a;
    },
    { team1: [], team2: [] }
  );
}
console.log(
  divideInGroups({
    0: [3],
    1: [2],
    2: [1, 4],
    3: [0, 4, 5],
    4: [2, 3],
    5: [3],
  })
);
console.log(
  divideInGroups({
    0: [3],
    1: [2],
    2: [1, 3, 4],
    3: [0, 2, 4, 5],
    4: [2, 3],
    5: [3],
  })
);
