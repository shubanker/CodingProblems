/**
Reconstruct Original Digits from English
Given a non-empty string containing an out-of-order English representation of digits 0-9, output the digits in ascending order.

Note:
Input contains only lowercase English letters.
Input is guaranteed to be valid and can be transformed to its original digits. That means invalid inputs such as "abc" or "zerone" are not permitted.
Input length is less than 50,000.
Example 1:
Input: "owoztneoer"

Output: "012"
Example 2:
Input: "fviefuro"

Output: "45"
 */
const convertWordToMap = (str: string) => {
  const map = new Map<string, number>();
  for (let i = 0; i < str.length; i++) {
    map.set(str[i], (map.get(str[i]) ?? 0) + 1);
  }
  return map;
};

const digitSet = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
/**
 * Algorithm has predefined set of string,
 * generates a count map of all the chars of input string.
 *
 * extract the set of strings which has a character unique to itself example z occurs only in zero,
 * for each unique char get count of occurance in input from the strMap we generated.
 * add n times the index of string containing unique char in digiSet
 * for the string containing unique char in digiSet, for each char subtract the count in strMap.
 * remove the strings having unique char from digiset and repeat
 *
 */
function originalDigits(s: string): string {
  let digits = [...digitSet];
  const op = [];
  const strMap = convertWordToMap(s);

  while (digits.length) {
    const digMap = convertWordToMap(digits.join(""));
    const enteries: string[] = []; //holds unique characters
    for (const [key, count] of digMap) {
      if (count === 1) {
        enteries.push(key);
      }
    }
    if (!enteries.length) {
      console.error("cant find any unique key, cant process with this algorithm..");
      break;
    }

    //Contains string having unique chars
    const unique: Record<string, string> = digits.reduce((a, b) => {
      for (let i = 0; i < enteries.length; i++) {
        if (b.indexOf(enteries[i]) + 1) {
          a[b] = enteries[i];
          enteries.splice(i, 1);
          break;
        }
      }
      return a;
    }, {});

    for (const key in unique) {
      const keyoccurance = strMap.get(unique[key]); //get number of times we have this string in input left.
      if (keyoccurance) {
        for (let i = 0; i < key.length; i++) {
          strMap.set(key[i], strMap.get(key[i]) - keyoccurance);
        }
        for (let i = 0; i < keyoccurance; i++) {
          op.push(digitSet.indexOf(key));
        }
      }
    }

    digits = digits.filter((d) => !unique[d]);
  }
  return op.sort().join("");
}
/**
 *
 * Problem focused algo.
 */
const originalDigits_focused = (s: string): string => {
  const counter = new Array<number>(10).fill(0);
  for (const c of s) {
    if (c === "z") counter[0]++;
    if (c === "w") counter[2]++;
    if (c === "x") counter[6]++;
    if (c === "s") counter[7]++; //7-6
    if (c === "g") counter[8]++;
    if (c === "u") counter[4]++;
    if (c === "f") counter[5]++; //5-4
    if (c === "h") counter[3]++; //3-8
    if (c === "i") counter[9]++; //9-8-5-6
    if (c === "o") counter[1]++; //1-0-2-4
  }
  counter[7] -= counter[6];
  counter[5] -= counter[4];
  counter[3] -= counter[8];
  counter[9] = counter[9] - counter[8] - counter[5] - counter[6];
  counter[1] = counter[1] - counter[0] - counter[2] - counter[4];
  const res = [] as string[];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < counter[i]; j++) {
      res.push(i.toString());
    }
  }
  return res.join("");
};

//DFS - Time limit exceed
const matchSubStringWithSet = (subStringMap: Map<string, number>, stringMap: Map<string, number>) => {
  for (const [char, count] of subStringMap) {
    if ((stringMap.get(char) ?? -1) < count) {
      return false;
    }
  }
  return true;
};
const digitWords = digitSet.map(convertWordToMap);
function originalDigits_DFS(s: string): string {
  const strMap = convertWordToMap(s);
  return getPossibleDigits(strMap, s.length)?.sort().join("");
}
const getPossibleDigits = (subStringMap: Map<string, number>, charsAvailable: number): number[] => {
  if (charsAvailable === 0) {
    return [];
  }
  for (let i = 0; i < digitWords.length; i++) {
    if (matchSubStringWithSet(digitWords[i], subStringMap)) {
      const cloned = new Map(subStringMap);
      for (const [char, count] of digitWords[i]) {
        cloned.set(char, cloned.get(char) - count);
      }
      const subAr = getPossibleDigits(cloned, charsAvailable - digitSet[i].length);
      if (subAr) {
        return [i, ...subAr];
      }
    }
  }
  return null;
};

//greedy, didnt work
function originalDigits_(s: string): string {
  const strMap = convertWordToMap(s);
  const nums: number[] = [];
  while (true) {
    let found = false;
    for (let i = 0; i < digitWords.length; i++) {
      if (matchSubStringWithSet(digitWords[i], strMap)) {
        for (const [char, count] of digitWords[i]) {
          strMap.set(char, strMap.get(char) - count);
        }
        nums.push(i);
        found = true;
        break;
      }
    }
    if (!found) {
      break;
    }
  }
  return nums.sort().join("");
}
console.log(originalDigits("owoztneoer"));
