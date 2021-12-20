const express = require('express');
const router = express.Router();

const {
    userAuthorization,
    createNewUser,
} = require('../controllers/controller');

// User routes
router.post('/createNewUser', createNewUser);
router.post('/userAuthorization',userAuthorization);

module.exports = router;