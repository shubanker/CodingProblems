/**
Custom Sort String
order and str are strings composed of lowercase letters. In order, no letter occurs more than once.

order was sorted in some custom order previously. We want to permute the characters of str so that they match the order that order was sorted. More specifically, if x occurs before y in order, then x should occur before y in the returned string.

Return any permutation of str (as a string) that satisfies this property.

Example:
Input: 
order = "cba"
str = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in order, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in order, it can be at any position in the returned string. "dcba", "cdba", "cbda" are also valid outputs.
 

Note:

order has length at most 26, and no character is repeated in order.
str has length at most 200.
order and str consist of lowercase letters only.
* */
function customSortString(order: string, str: string) {
  const strAr = str.split("");
  const orderMap = new Map<string, number>();
  for (let i = 0; i < order.length; i++) {
    orderMap.set(order[i], i);
  }
  const getIndex = (char: string) => {
    if (!orderMap.has(char)) {
      orderMap.set(char, order.length + char.charCodeAt(0) - 97);
    }
    return orderMap.get(char);
  };
  strAr.sort((a, b) => getIndex(a) - getIndex(b));
  return strAr.join("");
}
