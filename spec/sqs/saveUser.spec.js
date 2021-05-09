import { handle } from "../../src/lambdas/sqs/saveUser/handler";
import { createSandbox } from "sinon";
import * as DynamoDbClient from "../../src/shared/infra/aws/dynamoDb/dynamoDb.client";
import { UserDynamoRepository } from "../../src/shared/domain/user/user.dynamo.repository";

const sandbox = createSandbox();

describe("Save user sqs", () => {
  beforeEach(() => {
    sandbox.stub(process, "env").value({
      SQS_USER_EVENT_QUEUE: "mock_queue",
      AWS_LAMBDA_REGION: "mock_region",
    })

    spyOn(DynamoDbClient, "createDynamoDbClient").and.callFake(() => ({
      put: () => ({
        promise: () => Promise.resolve(true)
      })
    }));
  })

  const saveUser = async (messageAttributes) => {
    return handle({
      Records: [
        {
          messageAttributes
        },
      ]
    });
  }

  it("success", async () => {
    const spyOnSave = spyOn(UserDynamoRepository.prototype, "save")

    await saveUser({
      name: {
        stringValue: "Josh"
      },
      age: {
        stringValue: "55"
      }
    })

    expect(spyOnSave).toHaveBeenCalled();
  });
});
