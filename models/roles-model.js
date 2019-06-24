const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('roles');
}

function findById(id) {
    return db('roles')
    .where({ id })
    .first()
}

async function add(role) {
const [id] = await db('roles').insert(role);

return findById(id);
}

function update(id, changes) {
    return db('roles')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('roles')
    .where({ id })
    .del();
}