const router = require('express').Router();
const express = require('express');
// const User = require('./../models/userModel');
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

// router.post('/userSignUp',
//     (req, res) => {
//         User.create({
//             emailAddress: req.body.emailAddress,
//             phoneNumber: req.body.phoneNumber,
//             fullName: req.body.fullName,
//             fcmToken: req.body.fcmToken,
//             googleId: req.body.googleId
//         },
//             (createErr, createRes) => {

//                 if (createErr) {

//                     return res.json({
//                         status: false,
//                         message: "User create / update error",
//                         err: createErr
//                     });

//                 } else {

//                     return res.json({
//                         status: true,
//                         message: "New user created",
//                         result: createRes
//                     });

//                 }

//             }

//         );
//     });

// router.post('/userLogin',
//     (req, res) => {
//         User.findOneAndUpdate(
//             { emailAddress: req.body.emailAddress },
//             { fcmToken: req.body.fcmToken },

//             (findErr, dbRes) => {

//                 if (findErr) {

//                     return res.json({
//                         status: false,
//                         message: "User create / update error",
//                         err: findErr
//                     });

//                 } else {

//                     return res.json({
//                         status: true,
//                         message: "DB update succesful / user loged in",
//                         result: dbRes
//                     });

//                 }

//             });
//     });

router.post('/sendCallRequest',
    (req, res) => {
        console.log(req.body);
        var fcmToken = req.body.fcmToken;

        console.log('fcmToken from request : ' + fcmToken);

        sendFCM_notification(fcmToken);
        return;

    }
);

function sendFCM_notification(fcmToken) {
    firebaseAdmin.messaging().send({
        notification: {
            title: 'Learn live connection request',
            body: 'Incomming call'
        },
        android: {
            notification: {
                color: '#bd02aa'
            },
            collapseKey: 'message',
        },
        data: {
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
    }).catch((fcmErr) => {
        console.log(Date.now(), ': Error sending fcm notification.', err);
        return res.json({
            status: false,
            message: 'Error sending fcm notification',
            error: fcmErr
        });
    });;
}

module.exports = router;