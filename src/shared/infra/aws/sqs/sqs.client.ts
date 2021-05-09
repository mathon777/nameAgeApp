import { Config } from "../../../config/config";
import { SQS, AwsSdkClient } from "../sdk/sdk.client";

export type SqsClient = SQS;

interface Dependencies {
  readonly config: Config;
  readonly awsSdkClient: AwsSdkClient;
}

export const createSqsClient = ({ config, awsSdkClient }: Dependencies): SqsClient => {
  return new awsSdkClient.SQS({
    region: config.awsRegion,
  });
};
