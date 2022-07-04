/**
Unique Morse Code Words
International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows: "a" maps to ".-", "b" maps to "-...", "c" maps to "-.-.", and so on.

For convenience, the full table for the 26 letters of the English alphabet is given below:

[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
Now, given a list of words, each word can be written as a concatenation of the Morse code of each letter. 
For example, "cab" can be written as "-.-..--...", (which is the concatenation "-.-." + ".-" + "-..."). 
We'll call such a concatenation, the transformation of a word.

Return the number of different transformations among all words we have.

Example:
Input: words = ["gin", "zen", "gig", "msg"]
Output: 2
Explanation: 
The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."

There are 2 different transformations, "--...-." and "--...--.".
Note:

The length of words will be at most 100.
Each words[i] will have length in range [1, 12].
words[i] will only consist of lowercase letters.
 */
function uniqueMorseRepresentations(words: string[]): number {
  const morsSet = new Set<string>();
  words.forEach((word) => morsSet.add(UniqueMorse.getMors(word.toLowerCase())));
  return morsSet.size;
}
class UniqueMorse {
  static morseMap = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  static getMors(word: string) {
    let code = "";
    for (let index = 0; index < word.length; index++) {
      code += this.morseMap[word.charCodeAt(index) - 97];
    }
    return code;
  }
}
// console.log(UniqueMorse.getMors("gin"));
// console.log(UniqueMorse.getMors("zen"));
console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]));
