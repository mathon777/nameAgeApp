import { ValidationError } from "joi";
import { APIGatewayProxyResult } from "aws-lambda";
import { awsLambdaResponse } from "./infra/aws/aws";
import { HttpError } from "./errors/http.error";

export const handleError = (error: unknown): APIGatewayProxyResult => {
  if (error instanceof ValidationError) {
    return awsLambdaResponse(
      400,
      error.details.map((e) => e.message),
    );
  }

  if (error instanceof HttpError) {
    return awsLambdaResponse(error.status, error.message);
  }

  return awsLambdaResponse(500, "Unknown error");
};
