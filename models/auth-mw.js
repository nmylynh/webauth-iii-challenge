const jwt = require('jsonwebtoken');
const secrets = require('../database/secrets.js');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    token
    ? jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
        err
        ? res.status(401).json({ message: 'Invalid credentials.' })
        : req.user = { roles: decodeToken.roles, username: decodeToken.username }, next()
    })
    : res.status(400).json({ message: 'No token provided.' });
}
