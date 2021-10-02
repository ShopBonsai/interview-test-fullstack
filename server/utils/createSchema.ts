import { AuthResolver } from './../modules/resolvers/auth.resolver';
import { MerchantResolver } from '../modules/resolvers/merchant.resolver';
import { buildSchema } from 'type-graphql';
import { authChecker } from '../modules/middleware/auth-middleware';
import { OrderResolver } from '../modules/resolvers/order.resolver';
import * as path from 'path';

export const createSchema = () =>
  buildSchema({
    resolvers: [MerchantResolver, OrderResolver, AuthResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    authChecker,
  });
