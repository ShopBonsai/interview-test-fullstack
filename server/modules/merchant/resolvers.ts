import { merchants } from './mockMerchantData';
let products = [];
for (let merchant of merchants) {
    products = [...products, ...merchant.products];
}

export default {
    Query: {
        merchants: () => merchants,
        users: async (_, __, { dataSources }) => {
            const users = await dataSources.users.getUsers();
            if (users) {
                return users.map(user => {
                    return {
                        userId: user['_id'],
                    };
                });
            } else {
                return [];
            }
        },
    },
    Mutation: {
        // TODO: Error Handling
        addToCart: async (_, { productId, quantity }, { dataSources }) => {
            const cart = await dataSources.carts.get();
            const product = products.find(product => product.id == productId);
            // TODO: If product doesn't exist can't add it to cart
            if (cart) {
                const cartItem = cart.items.find(item => item.id == productId);

                if (cartItem) {
                    const updatedQuantity = cartItem.quantity + quantity;
                    await dataSources.carts.updateItemQuantity(
                        productId,
                        updatedQuantity
                    );
                } else {
                    await dataSources.carts.addItem(
                        {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                        },
                        quantity
                    );
                }
            } else {
                await dataSources.carts.create(
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                    },
                    quantity
                );
            }
            return {
                success: true,
                message: `Successfuly added ${quantity} ${product.name} to the cart`,
                cart: await dataSources.carts.get(),
            };
        },

        updateCart: async (_, { productId, quantity }, { dataSources }) => {
            const cart = await dataSources.carts.get();
            const product = products.find(product => product.id == productId);
            if (cart) {
                const cartItem = cart.items.find(item => item.id == productId);

                if (cartItem) {
                    await dataSources.carts.updateItemQuantity(
                        productId,
                        quantity
                    );
                } else {
                    // TODO: Error Can't update non-existing cart / product
                }
            } else {
                // TODO: Error Can't update non-existing cart / product
            }
            return {
                success: true,
                message: `Successfuly updated ${product.name} to ${quantity} in the cart`,
                cart: await dataSources.carts.get(),
            };
        },
    },
};
