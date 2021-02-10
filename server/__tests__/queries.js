const app = require('../server');
const supertest = require('supertest');

const request = supertest(app);


test('GET PRODUCTS from GRAPHQL', async (done) => {
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
