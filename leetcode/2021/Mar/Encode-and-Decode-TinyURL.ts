/**
Encode and Decode TinyURL
Note: This is a companion problem to the System Design problem: Design TinyURL.
TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.
 */

/**
 * Encodes a URL to a shortened URL.
 */
const map = new Map<number, string>();
function encode(longUrl: string): string {
  const hash = genHash(longUrl);
  map.set(hash, longUrl);
  return hash.toString();
}

/**
 * Decodes a shortened URL to its original URL.
 */
function decode(shortUrl: string): string {
  return map.get(genHash(shortUrl));
}
function genHash(str: string) {
  var hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
