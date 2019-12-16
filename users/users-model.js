const db = require('../data/db-config');

module.exports = {
    add,
    find,
    findBy
}

function find() {
    return db('users')
        .select('id', 'username');
}

function findBy(rowItem) {
    return db('users')
        .select('id', 'username', 'password')
        .where(rowItem);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return db('users')
                .select('id', 'username')
                .where({ id })
                .first();
        })
}

// function findById(id) {
//    return db('users')
//        .select('id', 'username')
//        .where({ id })
//        .first();
// }