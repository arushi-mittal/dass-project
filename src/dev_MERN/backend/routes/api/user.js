const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const { validateProfile } = require("../../validation/user");

router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

router.put('/profile', auth, (req, res) => {
    console.log(req)
    const _id = req.user.id;
    const filter = { _id: _id }
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findByIdAndUpdate(filter, req.body, { new: true })
        .then(
            updatedProfile => {
                if (!updatedProfile) return res.status(400).json({ msg: 'Can not update the profile' })
                res.json({ updatedProfile })
            }
        )
})

module.exports = router;