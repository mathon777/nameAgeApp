import { handle } from "../../src/lambdas/api/users/create/handler";
import { createSandbox } from "sinon";
import * as SqsClient from "../../src/shared/infra/aws/sqs/sqs.client";

const sandbox = createSandbox();

describe("User create api", () => {
  beforeEach(() => {
    sandbox.stub(process, "env").value({
      SQS_USER_EVENT_QUEUE: "mock_queue",
      AWS_LAMBDA_REGION: "mock_region",
    })

    spyOn(SqsClient, "createSqsClient").and.callFake(() => ({
      sendMessage: () => ({
        promise: () => Promise.resolve(true)
      })
    }));
  })

  const userCreate = async (name, age) => {
    return handle({
      body: JSON.stringify({
        name,
        age
      })
    });
  }

  it("success", async () => {
    const response = await userCreate("Josh", 80)
    expect(response.statusCode).toEqual(200);
  });

  it("validation failure - body.age", async () => {
    const response = await userCreate("Josh", 0)
    expect(response.statusCode).toEqual(400);
  });

  it("validation failure - body.name", async () => {
    const response = await userCreate("", 80)
    expect(response.statusCode).toEqual(400);
  });

  it("validation failure - config.SQS_USER_EVENT_QUEUE", async () => {
    sandbox.stub(process, "env").value({
      AWS_LAMBDA_REGION: "mock_region",
    })
    const response = await userCreate("Donald", 80)
    expect(response.statusCode).toEqual(400);
  });
});
