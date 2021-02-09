export function runTests(
  testCases: {
    arguments: any[];
    output: any;
    key?: any;
  }[],
  method: (...args: any) => any,
  equalityChecker: (a: any, b: any) => boolean = (a, b) => a === b
) {
  let passedCases = 0;
  const failedList = [];
  testCases.forEach((test, i) => {
    const result = method(...test.arguments);
    if (equalityChecker(result, test.output)) {
      passedCases++;
    } else {
      failedList.push({
        key: test.key || i,
        arguments: test.arguments,
        expected: test.output,
        actualOutput: result,
      });
    }
  });
  return {
    passedCases,
    failedCount: failedList.length,
    failedList,
  };
}
