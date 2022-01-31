const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();
router.use(express.json());
//localhost:3000/
router
    .route('/')
    .post(authController.signUp);

    
module.exports = router;