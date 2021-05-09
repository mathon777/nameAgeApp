import { Schema, ValidatorClient } from "../../../shared/common/validator/validator.client";

interface SchemaDependencies {
  readonly validatorClient: ValidatorClient;
}

export interface UserValidationSchema {
  name: {
    stringValue: string;
  };
  age: {
    stringValue: number;
  };
}

export const schema = ({ validatorClient }: SchemaDependencies): Schema<UserValidationSchema> =>
  validatorClient.object({
    name: validatorClient.object({ stringValue: validatorClient.string().required() }).unknown(true),
    age: validatorClient.object({ stringValue: validatorClient.number().integer().required() }).unknown(true),
  });
