import mongoose from 'mongoose';

import { MongoDataSource } from 'apollo-datasource-mongodb';

import {
    ObjectId,
    UpdateWriteOpResult,
    InsertOneWriteOpResult,
    DeleteWriteOpResultObject,
} from 'mongodb';

interface UserDocument {
    _id: ObjectId;
    name: string;
}

interface Context {
    user: UserDocument;
}

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Cart {
    _id: ObjectId;
    userId: string;
    cart: [CartItem];
}

export default class Carts extends MongoDataSource<mongoose.Document, Context> {
    get(): Promise<[Cart]> {
        return this.collection.findOne({ userId: 'contextId' }); // TODO: Replace with user id from context
    }

    create(
        product: Product,
        quantity: number
    ): Promise<InsertOneWriteOpResult<Cart>> {
        return this.collection.insertOne({
            userId: 'contextId', // TODO: Replace with user id from context
            createdOn: Date.now(),
            items: [
                {
                    ...product,
                    quantity,
                },
            ],
        });
    }

    delete(): Promise<DeleteWriteOpResultObject> {
        return this.collection.deleteOne({ userId: 'contextId' });
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
