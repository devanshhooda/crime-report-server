const router = require('express').Router();
const express = require('express');
const User = require('./../models/userModel');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.all('/', (req, res) => {
    return res.json({
        status: true,
        message: 'User controller is working properly...'
    });
})

router.get('/userLogin', (req, res) => {
    User.findOneAndUpdate(
        { email: req.body.email },
        { fcmToken: req.body.fcmToken },

        (findErr, dbRes) => {

            // new user register
            if (findErr) {
                User.create({
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    fullName: req.body.fullName,
                    fcmToken: req.body.fcmToken
                },
                    (createErr, createRes) => {

                        if (createErr) {
                            return res.json({
                                status: false,
                                message: "User create / update error",
                                err: createErr
                            });
                        } else {
                            return res.json({
                                status: false,
                                message: "New user created",
                                result: createRes
                            });
                        }

                    }

                );
            }

            // user login
            else {
                return res.json({
                    status: true,
                    message: "DB update succesful / user loged in",
                    result: dbRes
                });
            }

        });
});

module.exports = router;