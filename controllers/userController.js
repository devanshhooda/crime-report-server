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
module.exports = router;