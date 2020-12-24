import mongoose from 'mongoose';

import { MongoDataSource } from 'apollo-datasource-mongodb';

import { ObjectId, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';

interface UserDocument {
    _id: ObjectId;
    name: string;
}

interface Context {
    user: UserDocument;
}

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

export default class Carts extends MongoDataSource<mongoose.Document, Context> {
    get(): Promise<any> {
        return this.collection.findOne({ userId: 'contextId' }); // TODO: Replace with user id from context
    }

    create(
        product: Product,
        quantity: number
    ): Promise<InsertOneWriteOpResult<any>> {
        return this.collection.insertOne({
            userId: 'contextId', // TODO: Replace with user id from context
            items: [
                {
                    ...product,
                    quantity,
                },
            ],
        });
    }

    addItem(product: Product, quantity: number): Promise<UpdateWriteOpResult> {
        return this.collection.updateOne(
            { userId: 'contextId' }, // TODO: Replace with user id from context
            {
                $push: {
                    items: {
                        $each: [{ ...product, quantity }],
                    },
                },
            }
        );
    }

    updateItemQuantity(
        productId: string,
        quantity: number
    ): Promise<UpdateWriteOpResult> {
        if (quantity === 0) {
            return this.collection.updateOne(
                { userId: 'contextId' },
                {
                    $pull: {
                        items: {
                            id: productId,
                        },
                    },
                }
            );
        } else {
            return this.collection.updateOne(
                { userId: 'contextId', 'items.id': productId },
                { $set: { 'items.$.quantity': quantity } }
            );
        }
    }
}
