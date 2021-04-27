const db = require('../../db/connect');
interface argsAddToCart {
  user_id: string;
  product_id: number;
  quantity: number;
}

const ADD_TO_CART = async (_: any, args: argsAddToCart) => {
  console.log('----------------------------------');
  console.log(_, args);

  // GET the current users cart
  const userCartIdRes = await db('user_carts')
    .where('user_id', args.user_id)
    .first();

  console.log(userCartIdRes);

  const { user_id, product_id, quantity } = args;

  db('user_cart_products')
    .where('user_cart_id', userCartIdRes.id)
    .then(async (userCart: any) => {
      if (userCart.length === 0) {
        await db('user_cart_products').insert({
          user_cart_id: userCartIdRes.id,
          product_id,
          quantity,
        });
      }
    });

  // Exactly the same, but TypeScript complains if I call GET_ALL_PRODUCTS_IN_CART
  const userCart = await db('user_cart_products').where(
    'user_cart_id',
    userCartIdRes.id
  );

  // @return [Products]!
  return await db('products').whereIn(
    'id',
    userCart.map((rec: any) => rec.product_id)
  );
};

module.exports = { ADD_TO_CART };
