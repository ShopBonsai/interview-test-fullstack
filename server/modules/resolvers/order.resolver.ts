import { OrderInput } from '../entities/order-input';
import { Order, OrderModel } from '../entities/order';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver((of) => Order)
export class OrderResolver {
  @Query((returns) => [Order], { description: 'Get all the recipes from around the world ' })
  @Authorized()
  async orders(@Ctx() ctx: any): Promise<Order[]> {
    const orders = await OrderModel.find({ userId: ctx.req.user.userId });

    return orders;
  }

  @Mutation((returns) => Order, { description: 'Create a Order' })
  @Authorized()
  async createOrder(@Arg('order') orderInput: OrderInput, @Ctx() ctx: any): Promise<Order> {
    const order = new OrderModel({
      ...orderInput,
      userId: ctx.req.user.userId,
      total: orderInput.products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2),
      guid: '1',
    });

    await order.save();

    return order;
  }
}
