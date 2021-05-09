import { APIGatewayProxyResult } from "aws-lambda";

const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PATCH",
};

export const awsLambdaResponse = (statusCode: number, body: unknown): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      ...commonHeaders,
    },
  };
};
