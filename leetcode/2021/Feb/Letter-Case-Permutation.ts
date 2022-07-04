/**
Letter Case Permutation
Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. You can return the output in any order.

 

Example 1:

Input: S = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
Example 2:

Input: S = "3z4"
Output: ["3z4","3Z4"]
Example 3:

Input: S = "12345"
Output: ["12345"]
Example 4:

Input: S = "0"
Output: ["0"]
 

Constraints:

S will be a string with length between 1 and 12.
S will consist only of letters or digits.
 */
function letterCasePermutation(S: string): string[] {
  S = S.toLowerCase();
  const charIndex: number[] = [];
  const combinations = [S];

  //Extracting locations of non numeric characters.
  for (let i = 0; i < S.length; i++) {
    if (Number.isNaN(+S.charAt(i))) {
      charIndex.push(i); //charIndex array can be saved by moving below logic here.
    }
  }
  const makeUpperCaseAt = (str: string, index: number) =>
    str.slice(0, index) + str.charAt(index).toUpperCase() + str.slice(index + 1);

  //For each character double array and make character at that Index to upperCase.
  charIndex.forEach((charInd) => {
    const length = combinations.length;
    for (let i = 0; i < length; i++) {
      combinations.push(makeUpperCaseAt(combinations[i], charInd));
    }
  });
  return combinations;
}
console.log(letterCasePermutation("a1b2"));
