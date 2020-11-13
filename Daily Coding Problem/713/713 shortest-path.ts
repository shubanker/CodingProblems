/**
Given an absolute pathname that may have . or .. as part of it, return the shortest standardized path.

For example, given "/usr/bin/../bin/./scripts/../", return "/usr/bin/".
 */
export const shortestFilePath = (absolutePath: string) => {
  return absolutePath
    .split("/")
    .reduce((accum, dir) => {
      if (dir === "..") {
        accum.pop();
      } else if (dir !== ".") {
        accum.push(dir);
      }
      return accum;
    }, [])
    .join("/");
};
console.log(shortestFilePath("/usr/bin/../bin/./scripts/../"));
console.log(shortestFilePath("/usr/bin/../bin/./scripts/../abc/../shub/./"));
