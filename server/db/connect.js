// (function () {
const knex = require('knex');
const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const db = knex(connectionConfig);

/*
 * TODO: Create a init() script to CREATE DATABASE IF NOT EXISTS
 * For now, it is a matter of going into mysql cli `mysql -u root -p` and creating DB
 */
module.exports = db;
// })();
