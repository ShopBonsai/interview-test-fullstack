const mongoose = require('mongoose');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('GRAPHQL Endpoints', () => {
    afterAll(async() => {
        try {
            await mongoose.disconnect();
        } catch (error) {
            throw error;
        }
    });
    const user = {
        userId: 'df7aa083-7b59-45fd-a036-31efa59212c7',
        firstName:'Shopper',
        lastName: 'Userton',
        email: 'bonsaieri.shopperton@email.com',
        likes:['a561cb49-bd09-47c6-b234-8997f49c8770']
    }
    const product = {
        productId: 'a561cb49-bd09-47c6-b234-8997f49c8770'
    }
    it('GET PRODUCTS', async (done) => {
        request
            .post('/graphql')
            .send({
                query: '{ merchants { guid merchant products { id name price description color size image } } }',
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data.merchants).toBeInstanceOf(Array);
                expect(res.body.data.merchants.length).toEqual(94);
                done();
            });
    });
    it('GET USER BY ID', async (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ user(userId: "${user.userId}") { userId firstName lastName email likes } }`
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data.user).toBeInstanceOf(Object);
                expect(res.body.data.user).toHaveProperty('firstName');
                expect(res.body.data.user.firstName).toEqual(user.firstName);
                expect(res.body.data.user).toHaveProperty('firstName');
                expect(res.body.data.user.lastName).toEqual(user.lastName);
                expect(res.body.data.user).toHaveProperty('email');
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.data.user.likes).toBeInstanceOf(Array);
                expect(res.body.data.user.likes).toEqual([product.productId]);
                done();
            });
    });
    it('STORES A LIKED PRODUCT', async(done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation { setLikedItem(userId: "${user.userId}", productId: "${product.productId}") { isLiked } }`
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data).toHaveProperty('setLikedItem');
                expect(res.body.data.setLikedItem).toHaveProperty('isLiked');
                expect(res.body.data.setLikedItem.isLiked).toEqual(true);
                done();
            })
    });
})
