interface UserModel {
  id: string;
  name: string | undefined;
  age: string | undefined;
}

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly age: string;

  public static create(data: UserModel): User {
    const entity = new User();
    Object.assign(entity, data);
    return entity;
  }
}
