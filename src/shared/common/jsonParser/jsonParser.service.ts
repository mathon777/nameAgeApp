import { JsonParseError } from "./errors/jsonParse.error";
import { JsonParserClient } from "./jsonParser.client";

interface Dependencies {
  readonly jsonParserClient: JsonParserClient;
}

export class JsonParserService {
  private readonly jsonParserClient: JsonParserClient;

  public constructor({ jsonParserClient }: Dependencies) {
    this.jsonParserClient = jsonParserClient;
  }

  public parse<T>(value: string | null): T {
    if (typeof value !== "string") {
      throw new JsonParseError("Provided body is not valid.");
    }

    try {
      return this.jsonParserClient.parse(value);
    } catch (e) {
      throw new JsonParseError(e.message);
    }
  }

  public stringify(value: Record<string, unknown>): string {
    return this.jsonParserClient.stringify(value);
  }
}
