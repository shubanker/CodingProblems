export function runTests(
  testCases: {
    arguments: any[];
    output: any;
  }[],
  method: (...args: any) => any
) {
  let passedCases = 0;
  const failedList = [];
  testCases.forEach((test) => {
    const result = method(...test.arguments);
    if (result === test.output) {
      passedCases++;
    } else {
      failedList.push({
        ...test,
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
