// 😠 It's called db3 because `Cannot redeclare block-scoped variable 'db'.`
// I do not have time to fix that rn
const db3 = require('../../db/connect');

// const produceViewProductEvent = require('../../kafka/produceViewProductEvent.js');

/*----------------------------------------------------*/
/*----------------------------------------------------*/
/*----------------------------------------------------*/
/*
 * ❓ Not sure why the top isn't importing
 * I tried using __dir as well 🤔
 * I just copied it here so I can move on
 */
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
/*----------------------------------------------------*/
/*----------------------------------------------------*/
/*----------------------------------------------------*/

interface argsFindProduct {
  id: number;
  user_id?: string;
}
const FIND_PRODUCT = async (_: any, { id, user_id }: argsFindProduct) => {
  console.log('user_id', user_id);
  // Do this asynchronously
  // produceViewProductEvent({ id, user_id });
  return await db3('products').where('id', id).first();
};

module.exports = { FIND_PRODUCT };
