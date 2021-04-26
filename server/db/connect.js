const { createConnection, Connection } = require('typeorm');

const DB_NAME = 'bonsai_demo';

const dbOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
};

async function initializeDatabase() {
  const connection = await createConnection(dbOptions);
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  console.log('Database is ready');
}

async function connectToDatabase() {
  const connection = createConnection({ ...dbOptions, database: DB_NAME })
    .then(() => console.log('Database Connection Successful.'))
    .error(err => console.log(`Could not connect to DB: ${err}`));
}

module.exports = { connectToDatabase, initializeDatabase };

// 🏃‍♀️ `node server/db/connect.js`
// initializeDatabase();
initializeDatabase();
