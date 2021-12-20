const express = require('express');
const router = express.Router();

const {
    userAuthorization,
    createNewUser,
    getAllReceptions,
    createNewReception,
    changeReceptionInfo,
    deleteReception
} = require('../controllers/controller');

// User routes
router.post('/createNewUser', createNewUser);
router.post('/userAuthorization',userAuthorization);

// Reception routes
router.get('/getAllReceptions', getAllReceptions);
router.post('/createNewReception', createNewReception);
router.patch('/changeReceptionInfo', changeReceptionInfo);
router.delete('/deleteReception', deleteReception);

module.exports = router;