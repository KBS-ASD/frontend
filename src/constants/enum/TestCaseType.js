const TestCaseType = {
  REQUEST_RESPONSE: 1,
  CONSUME_CONSUMER: 2
};

export const TestCaseTypeName = {
  [TestCaseType.REQUEST_RESPONSE]: "Request/Response",
  [TestCaseType.CONSUME_CONSUMER]: "Consume/Consumer"
};

export default TestCaseType;
