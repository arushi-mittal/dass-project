const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/', (req, res) => {
    const { email, username, role, password } = req.body;
    if (!email || !password || !role || !username) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email: email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' })
            User.findOne({ username: username })
                .then(user => {
                    if (user) return res.status(400).json({ msg: 'Username already exists' })

                    const newUser = new User({
                        username,
                        email,
                        role,
                        password
                    })

                    // Create salt and hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    jwt.sign(
                                        { id: user.id },
                                        config.get('jwtSecret'),
                                        (err, token) => {
                                            if (err) throw err;
                                            res.json({
                                                token,
                                                user: {
                                                    id: user.id,
                                                    role: user.role,
                                                    email: user.email,
                                                    username: user.username
                                                }
                                            })
                                        }
                                    )
                                })
                        })
                    })
                })
        })
});

module.exports = router;