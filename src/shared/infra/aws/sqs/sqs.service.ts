import { SendMessageResult, SendMessageRequest } from "aws-sdk/clients/sqs";
import { SqsClient } from "./sqs.client";
import { SqsMessage } from "./messages/sqs.message";

interface Dependencies {
  readonly sqsClient: SqsClient;
}

export class SqsService {
  private readonly sqsClient: SqsClient;

  public constructor({ sqsClient }: Dependencies) {
    this.sqsClient = sqsClient;
  }

  public sendMessage(message: SqsMessage): Promise<SendMessageResult> {
    const sqsMessageRequest = SqsService.formatToSqsMessage(message);
    return this.sqsClient.sendMessage(sqsMessageRequest).promise();
  }

  private static formatToSqsMessage(message: SqsMessage): SendMessageRequest {
    const attributes = Object.entries(message.data).reduce(
      (messageAttributes, [attribute, typeValue]) => ({
        [attribute]: {
          DataType: typeValue.type,
          StringValue: typeValue.value,
        },
        ...messageAttributes,
      }),
      {},
    );

    return {
      MessageBody: message.body,
      MessageAttributes: attributes,
      QueueUrl: message.queueUrl,
      MessageGroupId: message.groupId,
      MessageDeduplicationId: message.deduplicationId,
    };
  }
}
