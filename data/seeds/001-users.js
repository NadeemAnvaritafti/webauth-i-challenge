
exports.seed = function(knex) {
  return knex('users').insert([
    {id: 1, username: 'user1', password: 'password' },
    {id: 2, username: 'user2', password: 'password' },
    {id: 3, username: 'user3', password: 'password' }
  ]);
};
