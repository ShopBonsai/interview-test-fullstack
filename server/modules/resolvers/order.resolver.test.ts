import { ProductInput } from './types/order-input';
import { gCall } from '../../test-utils/gCall';
import { UserModel } from '../entities/user';
import faker from 'faker';
import { intializeMongo } from '../../utils/typegoose.loader';

const createOrderMutation = `
mutation CreateOrder($order: OrderInput!) {
  createOrder(
    order: $order
  ) {
    products {
      id
      name
    }    
    total
    userId
  }
}
`;

const getOrderMutation = `
query {
  orders {
    guid
    total
  }
}
`;

describe('Order Resolver', () => {
  const userId = faker.datatype.uuid();

  const product = {
    name: faker.commerce.productName(),
    price: 10,
    quantity: 1,
    image: faker.random.image(),
  };

  const input = {
    products: [product],
    userId,
  };

  let conn;

  beforeAll(async () => {
    conn = await intializeMongo();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it.only('create order if user is authenticated', async () => {
    const response = await gCall({
      source: createOrderMutation,
      variableValues: {
        order: input,
      },
      userId,
    });

    expect(response).toMatchObject({
      data: {
        createOrder: {
          products: [
            {
              name: product.name,
            },
          ],
          total: '10.00',
          userId,
        },
      },
    });
  });

  it.only('shouldnt create order if user is not authenticated', async () => {
    const response = await gCall({
      source: createOrderMutation,
      variableValues: {
        order: input,
      },
    });

    expect(response.errors).toHaveLength(1);
  });

  it.only('should retrieve orders for a specific user', async () => {
    const response = await gCall({
      source: getOrderMutation,
      userId,
    });

    expect(response.data.orders).toHaveLength(1);
  });

  it.only('should retrieve orders for different users', async () => {
    const response = await gCall({
      source: getOrderMutation,
      userId: faker.datatype.uuid(),
    });

    expect(response.data.orders).toHaveLength(0);
  });
});
