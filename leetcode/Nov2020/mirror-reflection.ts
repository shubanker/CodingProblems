function mirrorReflection(p: number, q: number): number {
  let x = 1,
    y = 1;
  while (x * p !== y * q) {
    y++;
    x = Math.floor((y * q) / p);
  }
  if (x % 2 == 0 && y % 2 == 1) {
    return 0;
  }
  if (x % 2 == 1 && y % 2 == 1) {
    return 1;
  }
  if (x % 2 == 1 && y % 2 == 0) {
    return 2;
  }
  return -1;
}
console.log(mirrorReflection(2, 1));
console.log(mirrorReflection(3, 1));
