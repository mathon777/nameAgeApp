export type JsonParserClient = typeof JSON;

export const createJsonParserClient = (): JsonParserClient => {
  return JSON;
};
