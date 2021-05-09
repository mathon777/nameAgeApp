interface MessageAttributes {
  type: string;
  value: string;
}

export interface SqsMessage {
  body: string;
  data: Record<string, MessageAttributes>;
  queueUrl: string;
  groupId: string;
  deduplicationId: string;
}
