const db = require('../../db/connect');

interface argsGetAllProductsInCart {
  user_id: string;
}
const GET_ALL_PRODUCTS_IN_CART = async (
  _: any,
  args: argsGetAllProductsInCart
) => {
  console.log(_, args);
  const userCartIdRes = await db('user_carts')
    .where('user_id', args.user_id)
    .first();
  console.log(userCartIdRes);
  const userCart = await db('user_cart_products').where(
    'user_cart_id',
    userCartIdRes.id
  );

  console.log(userCart);
  return await db('products').whereIn(
    'id',
    userCart.map((rec: any) => rec.product_id)
  );
};

module.exports = { GET_ALL_PRODUCTS_IN_CART };
