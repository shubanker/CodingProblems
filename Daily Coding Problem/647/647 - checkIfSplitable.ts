let set = [15, 5, 20, 10, 35, 15, 10];

function checkIfSplitable(set) {
  if (set.length < 2) {
    return false;
  }
  let sum = set.reduce((a, b) => a + b);
  if (sum % 2 == 1) {
    return false;
  }
  let requiredSum = sum / 2;
  return checkForSum(set, requiredSum, 1, set[0]);
}
function checkForSum(set, requiredSum, index, sum) {
  if (index === set.length) {
    return false;
  }
  if (requiredSum === sum) {
    return true;
  }
  return checkForSum(set, requiredSum, index + 1, sum) || checkForSum(set, requiredSum, index + 1, sum + set[index]);
}
console.log(checkIfSplitable(set));
