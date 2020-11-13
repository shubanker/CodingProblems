/**
Given an absolute pathname that may have . or .. as part of it, return the shortest standardized path.

For example, given "/usr/bin/../bin/./scripts/../", return "/usr/bin/".
 */
export const shortestFilePath = (absolutePath: string) => {
  const shortDirs = [];
  absolutePath.split("/").forEach((dir) => {
    if (dir === "..") {
      shortDirs.pop();
    } else if (dir !== ".") {
      shortDirs.push(dir);
    }
  });
  return shortDirs.join("/");
};
console.log(shortestFilePath("/usr/bin/../bin/./scripts/../"));
console.log(shortestFilePath("/usr/bin/../bin/./scripts/../abc/../shub/./"));
