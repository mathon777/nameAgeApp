import aws from "aws-sdk";

export type AwsSdkClient = typeof aws;
export type SQS = aws.SQS;
export type DynamoDB = aws.DynamoDB.DocumentClient;

export const createAwsSdkClient = (): AwsSdkClient => {
  return aws;
};
