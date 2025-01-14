const express = require('express');
const server = express();
const configureMiddleware = require('./middleware/config-mw');
const auth = require('./routers/auth-router');
const users = require('./routers/users-router');
const roles = require('./routers/roles-router');
const admin = require('./routers/admin-router')

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>HELLO THIS IS PATRICK</h2>`)
  });  


server.use('/api/auth', auth);
server.use('/api/users', users);
server.use('/api/roles', roles);
server.use('/api/admin', admin);

module.exports = server;