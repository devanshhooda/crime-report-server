const router = require('express').Router();
const express = require('express');
const User = require('./../models/userModel');
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../fcmFile.json');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

router.all('/', (req, res) => {
    return res.json({
        status: true,
        message: 'User controller is working properly...'
    });
})

router.post('/userSignUp',
    (req, res) => {
        User.create({
            email: req.body.emailAddress,
            phoneNumber: req.body.phoneNumber,
            fullName: req.body.fullName,
            fcmToken: req.body.fcmToken,
            googleId: req.body.googleId
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
                        status: true,
                        message: "New user created",
                        result: createRes
                    });

                }

            }

        );
    });

router.post('/userLogin',
    (req, res) => {
        User.findOneAndUpdate(
            { email: req.body.emailAddress },
            { fcmToken: req.body.fcmToken },

            (findErr, dbRes) => {

                if (findErr) {

                    return res.json({
                        status: false,
                        message: "User create / update error",
                        err: findErr
                    });

                } else {

                    return res.json({
                        status: true,
                        message: "DB update succesful / user loged in",
                        result: dbRes
                    });

                }

            });
    });

router.post('/sendCallRequest',
    (req, res) => {

        User.findOne(
            { email: req.body.emailAddress },

            (findErr, dbRes) => {

                if (findErr) {

                    return res.json({
                        status: false,
                        message: "User login error",
                        err: findErr
                    });

                } else {

                    sendFCM_notification(dbRes.fcmToken, dbRes.fullName, req.body.mqttTopic).catch((fcmErr) => {
                        console.log(Date.now(), ': Error sending fcm notification.', err);
                        return res.json({
                            status: false,
                            message: 'Error sending fcm notification',
                            error: fcmErr
                        });
                    });

                    return res.json({
                        status: true,
                        message: "Call notif sent successfully",
                        result: dbRes
                    });

                }

            });

    }
);

function sendFCM_notification(fcmToken, fullName, mqttTopic) {
    firebaseAdmin.messaging().send({
        notification: {
            title: 'Learn live connection request',
            body: `${fullName} is calling`
        },
        android: {
            notification: {
                color: '#bd02aa'
            },
            collapseKey: 'message',
        },
        data: {
            mqttTopic: mqttTopic,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        token: fcmToken
    }).then((resp) => {
        console.log('Sent Notification to the User: ', resp);
        return res.json({
            status: true,
            message: 'Notification sent',
            result: resp
        });
    });
}

module.exports = router;