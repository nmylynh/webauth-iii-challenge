const express = require('express');
const rolesDB = require('../models/roles-model')
const router = express.Router();
const { restricted } = require('../middleware/auth-mw.js');


router.get('/', restricted, async (req, res) => {
    try {
        const roles = await rolesDB.find();

        res.status(200).json(roles);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const role = await rolesDB.findById(id);

        res.status(200).json(role);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 

router.post('/', restricted, async (req, res) => {
    try {
        const newRole = await rolesDB.add(req.body);

        res.status(201).json(newRole);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const updateRole = await rolesDB.update(id, req.body);

        updateRole
        ? res.status(200).json({ message: 'successfully updated role' })
        : res.status(404).json({ message: 'role not found'})
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', restricted, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await rolesDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});



module.exports = router;