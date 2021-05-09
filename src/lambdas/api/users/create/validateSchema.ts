import { Schema, ValidatorClient } from "../../../../shared/common/validator/validator.client";

interface SchemaDependencies {
  readonly validatorClient: ValidatorClient;
}

interface UserValidationSchema {
  name: string;
  age: number;
}

export const schema = ({ validatorClient }: SchemaDependencies): Schema<UserValidationSchema> =>
  validatorClient.object({
    name: validatorClient.string().max(255).required(),
    age: validatorClient.number().integer().positive().required(),
  });
