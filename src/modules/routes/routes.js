const express = require('express');
const router = express.Router();

const {
    createUserAuthorization,
    createNewUser,
} = require('../controllers/controller');

// User routes
router.post('/createNewUser', createNewUser);
router.post('/createUserAuthorization',createUserAuthorization);

module.exports = router;