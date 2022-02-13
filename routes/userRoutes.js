const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();
router.use(express.json());
//localhost:3000/
router
    .route('/')
    .post(authController.signUp).get(authController.showUser);
router
    .route('/login').post(authController.login)

    
module.exports = router;