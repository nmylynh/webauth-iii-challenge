const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    get
}

function find() {
    return db('user_roles');
}

function findById(id) {
    return db('user_roles')
    .where({ id })
    .first()
}

function get() {
    return db('user_roles')
    .join('roles', 'user_roles.role_id', 'roles.id')
    .join('users', 'user_roles.user_id', 'users.id')
    .select('user_roles.id', 'users.id as user_id' , 'users.username', 'roles.role')
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