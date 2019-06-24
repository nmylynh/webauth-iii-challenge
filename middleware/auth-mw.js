const jwt = require('jsonwebtoken');
const secrets = require('../database/secret.js');

module.exports = {
    restricted: (req, res, next) => {

        const token = req.headers.authorization;
    
        token
        ? jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            err
            ? res.status(401).json({ message: 'Invalid credentials.' })
            : req.user = { roles: decodeToken.roles, username: decodeToken.username }, next()
        })
        : res.status(400).json({ message: 'No token provided.' });
    },
    checkRole: (role) => {
        return function(req, res, next) {
            req.user
            ? (req.user.roles 
               && Array.isArray(req.users.roles) 
               && req.user.roles.includes(role)
               ? next()
               : res.status(403).json({ message: `You ain't authoriiiiiized sooooooonnnn!` }))
            : res.status(401).json({ message: `Ya'll need to login first, yunno?` });
        }
    }
} 