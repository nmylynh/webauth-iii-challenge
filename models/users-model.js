const db = require('../database/dbConfig.js');
const { getOnlyRoles } = require('./helpers/users-helper');

module.exports = {
    find,
    findById,
    update,
    remove,
    getUserRoles,
    get
}

function find() {
    return db('users');
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()
}


function get(id) {
    let users = db('users');
  
    if (id) {
      users.where({ id }).first();
  
      const promises = [users, this.getUserRoles(id)]; 
  
      return Promise.all(promises).then(results => {
        let [user, roles] = results;
  
        if (user) {
            user.roles = getOnlyRoles(roles);
        
            return user
          } else {
            return null;
          }
        });
    }
  
    return users
}

function getUserRoles(id) {
    let loadRoles = db('user_roles')
        .where('user_id', id)
        .join('roles', 'user_roles.role_id', 'roles.id')
        .join('users', 'user_roles.user_id', 'users.id')
        .select('user_roles.id', 'users.id as user_id' , 'users.username', 'roles.role')

    return loadRoles
}

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes, '*')
}

function remove(id) {
    return db('users')
    .where({ id })
    .del();
}