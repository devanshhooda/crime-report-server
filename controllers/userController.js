const router = require('express').Router();

const user = require('../models/userModel');

router.all('/', (req, res) => {
    return res.json({
        status: true,
        message: 'User controller is working properly...'
    });
})