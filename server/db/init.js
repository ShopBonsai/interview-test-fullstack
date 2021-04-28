require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile');

const connectionConfig = knexConfig['standard'];
const db = knex(connectionConfig);

const initDB = () => {
  db.raw(`CREATE DATABASE IF NOT EXISTS ${process.env.DEVELOPMENT_DATABASE}`)
    .then(() => {
      console.log('✅ Database is in good shape.');
    })
    .catch(err => console.log(`❌ Error initializing database: ${err}`));
  return;
};

initDB();
