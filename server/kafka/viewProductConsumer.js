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
      // here, we just log the message to the standard output
      console.log(`received message: ${message.value}`);
    },
  });
};

// Turns on consumer
consumeViewProductEvents();

module.exports = consumeViewProductEvents;
