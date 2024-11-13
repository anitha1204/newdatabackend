const express = require('express');
const router = express.Router();
const { register, sendOtp, verifyOtpAndLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtpAndLogin', verifyOtpAndLogin);

module.exports = router;
