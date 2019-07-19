const { get } = require('../users-model');

module.exports = {
    getOnlyRoles
 }
 
function getOnlyRoles(rolesObjectsArray) {
    const roles = rolesObjectsArray.map(roleObject => {
        return roleObject.role
    })

    return roles
}

