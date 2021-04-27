const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('user_carts', function createUserCartTable(t) {
    t.increments().notNullable();

    // belongs_to a `user`
    t.string('user_id').notNullable().unique();

    // ❕ Maybe I will use this... maybe not. Can always drop later
    t.integer('num_items').defaultTo(0);

    // TIMESTAMPS
    addTimestamps(knex, t);
  });

  // Also create a `user_cart` for each User
  const userIdRes = await knex.select('id').from('users');
  const userIds = userIdRes.map(rec => {
    return { user_id: rec.id };
  });

  // console.log(userIds);
  await knex('user_carts').insert(userIds);
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('user_carts');
};
