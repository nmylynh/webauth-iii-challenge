const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userDB = require('../models/users-model');
const auth = require('../middleware/auth-mw.js');
const mw = require('../middleware/users-mw');

router.get('/', auth.restricted, async (req, res) => {
    try {
        const users = await userDB.find();

        res.status(200).json({ users, user: req.user });
    } catch(err) {
        res.status(500).json({ success:false, err })
    }
});

router.get('/:id', auth.restricted, mw.validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDB.findById(id);

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});

router.put('/:id', auth.restricted, mw.validateUserId, mw.validateUserBody, async (req, res) => {
    try {
        const { id } = req.params;
        let newUser = req.body;

        const hash = bcrypt.hashSync(newUser.password, 14);
        newUser.password = hash;

        const updateUser = await userDB.update(id, req.body);

        updateUser 
        ? res.status(200).json({message: 'successfully updated credentials'}) 
        : res.status(404).json({message: 'missing required fields'})
    } catch(err) {
        res.status(500).json({ success:false, err })
    }
});

router.delete('/:id', auth.restricted, mw.validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const success = await userDB.remove(id);
        
        success ?
         res.status(204).end() : res.status(404).end();
    } catch(err) {
        res.status(500).json({ success:false, err })
    }
});



module.exports = router;