const { Kafka } = require('kafkajs');

const config = {
  KAFKA_HOST: 'localhost:9092',
  KAFKA_TOPIC_NAME: 'view-product-topic',
  CLIENT_ID: 'bonsai_kafka',
};

const kafka = new Kafka({
  clientId: config.CLIENT_ID,
  brokers: [config.KAFKA_HOST],
});

const consumer = kafka.consumer({ groupId: config.CLIENT_ID });

const consumeViewProductEvents = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic: config.KAFKA_TOPIC_NAME });
  await consumer.run({
    eachMessage: ({ message }) => {
      handleProductViewEvent(JSON.parse(message.value));
    },
  });
};

class ProductViewCache {
  constructor() {
    this.cacheObj = {};
  }

  hasUser(userId) {
    return userId in this.cacheObj;
  }

  has(userId, productId) {
    if (this.hasUser(userId) === false) return false;
    return productId in this.cacheObj[userId];
  }

  incrementViewFor(userId, productId) {
    if (!this.hasUser(userId)) this.cacheObj[userId] = {};
    if (!this.has(userId, productId)) {
      this.cacheObj[userId][productId] = { views: 0 };
    }

    ++this.cacheObj[userId][productId].views;
  }

  resetViewsFor(userId, productId) {
    if (this.has(userId, productId)) {
      this.cacheObj[userId][productId] = { views: 0 };
    }
  }

  getNumViewsFor(userId, productId) {
    if (this.has(userId, productId) === false) return null;
    return this.cacheObj[userId][productId].views;
  }
}

function handleProductViewEvent(eventBlob) {
  console.log('Incoming Event: ', eventBlob);
  const productId = eventBlob.id;
  const userId = eventBlob.user_id;

  // State Machine
}

// Turns on consumer
consumeViewProductEvents();

module.exports = consumeViewProductEvents;
