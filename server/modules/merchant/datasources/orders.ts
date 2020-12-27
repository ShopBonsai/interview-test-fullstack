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

interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Order {
    _id: ObjectId;
    userId: string;
    orderDate: Date;
    status: string;
    shippedDate: Date;
    orderItems: [OrderItem];
}

export default class Carts extends MongoDataSource<mongoose.Document, Context> {
    get(): Promise<any[]> {
        return this.collection.find({ userId: 'contextId' }).toArray(); // TODO: Replace with user id from context
    }

    create(orderItems: [OrderItem]): Promise<InsertOneWriteOpResult<Order>> {
        return this.collection.insertOne({
            userId: 'contextId', // TODO: Replace with user id from context
            orderDate: Date.now(),
            status: 'Unfulfilled',
            shippedDate: null,
            orderItems,
        });
    }
}
