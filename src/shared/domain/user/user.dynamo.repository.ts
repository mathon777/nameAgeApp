import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { User } from "./user.model";
import { DynamoDbClient } from "../../infra/aws/dynamoDb/dynamoDb.client";

interface Dependencies {
  readonly dynamoDbClient: DynamoDbClient;
}

export class UserDynamoRepository {
  private readonly tableName: string;
  private readonly dynamoDbClient: DynamoDbClient;

  public constructor({ dynamoDbClient }: Dependencies) {
    this.dynamoDbClient = dynamoDbClient;
    this.tableName = "users";
  }

  public save(user: User): Promise<PutItemOutput> {
    return this.dynamoDbClient.put({ TableName: this.tableName, Item: user }).promise();
  }
}
