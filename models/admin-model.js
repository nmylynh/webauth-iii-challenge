const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('user_roles');
}

function findById(id) {
    return db('user_roles')
    .where({ id })
    .first()
}
  
async function add(role) {
    const [id] = await db('user_roles').insert(role);
    return findById(id);
}

function update(id, changes) {
    return db('user_roles')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('user_roles')
    .where({ id })
    .del();
}