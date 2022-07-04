// "abc" ,'bac','cba,'cab';

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }

  const map = new Map();
  for (let i = 0; i < str1.length; i++) {
    const currentChar = str1[i];
    map.set(currentChar, (map.get(currentChar) || 0) + 1);
  }

  for (let i = 0; i < str2.length; i++) {
    const currentChar = str2[i];
    if (!map.has(currentChar) || map.get(currentChar) === 0) {
      return false;
    }
    map.set(currentChar, map.get(currentChar) - 1);
  }
  for (const iterator of map.values()) {
    if (iterator) {
      return false;
    }
  }
  return true;
}
console.log(isAnagram("abc", "cba"));
console.log(isAnagram("abc", "cbaa"));
console.log(isAnagram("abc", "cbbaa"));
console.log(isAnagram("aaaaa", "bbbbb"));
