import { gCall } from './../../test-utils/gCall';
import { UserModel } from './../entities/user';
import faker from 'faker';
import { intializeMongo } from '../../utils/typegoose.loader';

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    email    
    name    
  }
}
`;

const loginMutation = `
mutation Login($email: String!, $password: String!) {
  auth(
    email: $email,
    password: $password
  ) {
    email    
    name    
  }
}
`;

describe('Auth Resolver', () => {
  let conn;
  let user;
  beforeAll(async () => {
    conn = await intializeMongo();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it.only('create user', async () => {
    user = {
      name: faker.name.firstName() + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          name: user.name,
          email: user.email,
        },
      },
    });

    const dbUser = await UserModel.findOne({ email: user.email });

    expect(dbUser).toBeDefined();
    expect(dbUser.name).toBe(user.name);
  });

  it.only('login a valid user', async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        email: user.email,
        password: user.password,
      },
    });

    expect(response).toMatchObject({
      data: {
        auth: {
          name: user.name,
          email: user.email,
        },
      },
    });
  });
});
