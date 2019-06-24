const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userDB = require('../models/auth-model')
const mw = require('../middleware/users-mw');
const jwt = require('jsonwebtoken');
const secrets = require('../database/secret.js');

router.post('/register', mw.validateUserBody, async (req, res) => {
    try {
        let newUser = req.body;

        const hash = bcrypt.hashSync(newUser.password, 14);
        newUser.password = hash;

        const savedUser = await userDB.register(newUser); 
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(500).json({ success: false, err });
    }
});

router.post('/login', mw.validateUserBody, async (req, res) => {
    try {
        const { username, password } = req.body;
        let token = null;

        const user = await userDB.login(username);

        user && bcrypt.compareSync(password, user.password)
        ? (token = generateToken(user),
          res.status(200).json({ message: `Welcome ${user.username}!`, token }))
        : res.status(401).json({ message: 'Invalid credentials.' });
    } catch(err) {
        res.status(500).json({ success: false, err })
    }
});


router.delete('/', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }

    res.status(200).json({ message: 'You have now been logged out.' });
});

//auth function

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: [user.roles]
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;