import { Context, APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import uuid from "uuid";
import { schema } from "./validateSchema";

import { createValidatorClient } from "../../../../shared/common/validator/validator.client";
import { ValidatorService } from "../../../../shared/common/validator/validator.service";
import { createJsonParserClient } from "../../../../shared/common/jsonParser/jsonParser.client";
import { JsonParserService } from "../../../../shared/common/jsonParser/jsonParser.service";

import { handleError } from "../../../../shared/errorHandler";

import { createConfig } from "../../../../shared/config/config";

import { createSqsClient } from "../../../../shared/infra/aws/sqs/sqs.client";
import { SqsService } from "../../../../shared/infra/aws/sqs/sqs.service";
import { awsLambdaResponse } from "../../../../shared/infra/aws/aws";
import { createAwsSdkClient } from "../../../../shared/infra/aws/sdk/sdk.client";
import { winstonLogger } from "../../../../shared/infra/logger";

export async function handle(event: APIGatewayProxyEvent, _: Context): Promise<APIGatewayProxyResult> {
  try {
    const validatorClient = createValidatorClient();
    const validatorService = new ValidatorService({ validatorClient });

    const config = createConfig({ validatorClient, validatorService });

    const jsonParserClient = createJsonParserClient();
    const jsonParserService = new JsonParserService({ jsonParserClient });

    const input: Record<string, unknown> = jsonParserService.parse(event.body);
    const body = validatorService.validateSchema(schema({ validatorClient }), input, { abortEarly: false });

    const awsSdkClient = createAwsSdkClient();
    const sqsClient = createSqsClient({ config, awsSdkClient });
    const sqsService = new SqsService({ sqsClient });

    const sendMessageResult = await sqsService.sendMessage({
      body: "Create user",
      data: {
        name: {
          type: "String",
          value: body.name,
        },
        age: {
          type: "Number",
          value: body.age.toString(),
        },
      },
      queueUrl: config.userEventQueue,
      groupId: "create_user_event",
      deduplicationId: uuid.v4(),
    });

    return awsLambdaResponse(200, {
      success: true,
      messageId: sendMessageResult.MessageId,
    });
  } catch (e) {
    winstonLogger.error(e);
    return handleError(e);
  }
}
