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

const producer = kafka.producer();

// we define an async function that writes a new message each second
const produceViewProductEvent = async messageObj => {
  await producer.connect();

  // after the produce has connected, we start an interval timer
  // setInterval(async () => {
  try {
    // send a message to the configured topic with
    // the key and value formed from the current value of `i`
    await producer.send({
      topic,
      messages: [messageObj],
    });

    console.log(`Message has been written: ${message}`);
  } catch (err) {
    console.error(`Error publishing message: ${err}`);
  }
};

module.exports = produceViewProductEvent;
