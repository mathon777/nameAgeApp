import Joi from "joi";

export type ValidatorClient = Joi.Root;
export type Schema<S> = Joi.ObjectSchema<S>;
export type ValidationOptions = Joi.ValidationOptions;

export const createValidatorClient = (): ValidatorClient => {
  return Joi;
};
