const express = require('express');
const userRoles = require('../models/admin-model')
const router = express.Router();
const { restricted, checkRole } = require('../middleware/auth-mw.js');


router.get('/', restricted, checkRole('admin'), async (req, res) => {
    try {
        const roles = await userRoles.find();

        res.status(200).json(roles);
    } catch(err) {
        res.status(500).json({ success: false, err });
    }
});


router.get('/:id', restricted, checkRole('admin'), async (req, res) => {
    try {
        const {id} = req.params;
        const role = await userRoles.findById(id);

        res.status(200).json(role);
    } catch(err) {
        res.status(500).json({ success: false, err });
    }
}); 

router.post('/', restricted, checkRole('admin'), async (req, res) => {
    try {
        const newRole = await userRoles.add(req.body);

        res.status(201).json(newRole);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', restricted, checkRole('admin'), async (req, res) => {
    try {
        const {id} = req.params;
        const editUserRole = await userRoles.update(id, req.body);

        editUserRole
        ? res.status(200).json({ message: `successfully user's role` })
        : res.status(404).json({ message: `user's role not found` })
    } catch(err) {
        res.status(500).json({ success: false, err });
    }
});

router.delete('/:id', restricted, checkRole('admin'), async (req, res) => {
    try {
        const {id} = req.params;
        const success = await userRoles.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({ success: false, err });
    }
});



module.exports = router;