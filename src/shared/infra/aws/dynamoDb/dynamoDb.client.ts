import { AwsSdkClient, DynamoDB } from "../sdk/sdk.client";

export type DynamoDbClient = DynamoDB;

interface Dependencies {
  readonly awsSdkClient: AwsSdkClient;
}

export const createDynamoDbClient = ({ awsSdkClient }: Dependencies): DynamoDbClient => {
  return new awsSdkClient.DynamoDB.DocumentClient();
};
