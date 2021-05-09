import { ValidatorClient, Schema, ValidationOptions } from "./validator.client";

interface Dependencies {
  readonly validatorClient: ValidatorClient;
}

export class ValidatorService {
  private readonly validatorClient: ValidatorClient;

  public constructor({ validatorClient }: Dependencies) {
    this.validatorClient = validatorClient;
  }

  public validateSchema<V>(schema: Schema<V>, values: Record<keyof V, unknown>, options?: ValidationOptions): V {
    const { value, error } = schema.validate(values, options);

    if (error) {
      throw error;
    }

    return value;
  }
}
