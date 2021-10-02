import { ProductInput } from './types/order-input';
import { gCall } from '../../test-utils/gCall';
import { UserModel } from '../entities/user';
import faker from 'faker';
import { intializeMongo } from '../../utils/typegoose.loader';

const getMerchants = `
query {
    merchants {
        guid
        merchant
        products {
            id
            name
            price
            description
            color
            size
            image
        }
    }
}
`;

describe('Merchant Resolver', () => {
  let conn;

  beforeAll(async () => {
    conn = await intializeMongo();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it.only('should retrieve merchants information', async () => {
    const response = await gCall({
      source: getMerchants,
    });

    expect(response.data.merchants).toBeTruthy();
  });
});
