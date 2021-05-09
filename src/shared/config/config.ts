import { ValidatorClient } from "../common/validator/validator.client";
import { ValidatorService } from "../common/validator/validator.service";

export interface Config {
  userEventQueue: string;
  awsRegion: string;
}

interface CreateConfigDependencies {
  readonly validatorClient: ValidatorClient;
  readonly validatorService: ValidatorService;
}
export const createConfig = ({ validatorClient, validatorService }: CreateConfigDependencies): Config => {
  const schema = validatorClient
    .object({
      SQS_USER_EVENT_QUEUE: validatorClient.string().required(),
      AWS_LAMBDA_REGION: validatorClient.string().required(),
    })
    .unknown(true);

  const envVariables = validatorService.validateSchema(schema, process.env);

  return {
    userEventQueue: envVariables.SQS_USER_EVENT_QUEUE,
    awsRegion: envVariables.AWS_LAMBDA_REGION,
  };
};
