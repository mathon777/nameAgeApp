import { SQSEvent, SQSMessageAttributes } from "aws-lambda";
import uuid from "uuid";
import { schema } from "./validateSchema";

import { User } from "../../../shared/domain/user/user.model";
import { UserDynamoRepository } from "../../../shared/domain/user/user.dynamo.repository";

import { createValidatorClient } from "../../../shared/common/validator/validator.client";
import { ValidatorService } from "../../../shared/common/validator/validator.service";

import { createDynamoDbClient } from "../../../shared/infra/aws/dynamoDb/dynamoDb.client";
import { winstonLogger } from "../../../shared/infra/logger";

import { createAwsSdkClient } from "../../../shared/infra/aws/sdk/sdk.client";

export async function handle(event: SQSEvent): Promise<void> {
  try {
    const validatorClient = createValidatorClient();
    const validatorService = new ValidatorService({ validatorClient });

    const { messageAttributes } = event.Records[0];

    const messageData = validatorService.validateSchema<SQSMessageAttributes>(
      schema({ validatorClient }),
      messageAttributes,
      {
        abortEarly: false,
      },
    );

    const user = User.create({
      id: uuid.v4(),
      name: messageData.name.stringValue,
      age: messageData.age.stringValue,
    });

    const awsSdkClient = createAwsSdkClient();
    const dynamoDbClient = createDynamoDbClient({ awsSdkClient });
    const userRepository = new UserDynamoRepository({ dynamoDbClient });

    await userRepository.save(user);
  } catch (e) {
    winstonLogger.error(e);
  }
}
