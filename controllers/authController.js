const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Newdata = require('../models/userModel');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

// Helper function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory OTP store (use a database or Redis in production)
const otpStore = {};

// Helper function to validate inputs
function validateInputs({ Email, Password, userName, MobileNumber }) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const mobileNumberRegex = /^\d{10}$/;

  if (!emailRegex.test(Email)) {
    return { valid: false, msg: 'Invalid email format' };
  }
  if (!passwordRegex.test(Password)) {
    return { valid: false, msg: 'Password must be at least 8 characters, include one letter, one number, and one special character' };
  }
  if (!usernameRegex.test(userName)) {
    return { valid: false, msg: 'Username can only contain letters and numbers' };
  }
  if (!mobileNumberRegex.test(MobileNumber)) {
    return { valid: false, msg: 'Mobile number must be exactly 10 digits' };
  }

  return { valid: true };
}

// Registration route
exports.register = async (req, res) => {
  const { userName, Email, Password, MobileNumber } = req.body;

  // Validate inputs
  const validation = validateInputs({ Email, Password, userName, MobileNumber });
  if (!validation.valid) {
    return res.status(400).json({ msg: validation.msg });
  }

  try {
    // Check if the user already exists
    let user = await Newdata.findOne({ Email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user
    user = new Newdata({
      userName,
      Email,
      Password: hashedPassword,
      MobileNumber,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
};

// Step 1: Send OTP for login via email
exports.sendOtp = async (req, res) => {
  const { Email } = req.body;

  try {
    // Check if the email exists
    const user = await Newdata.findOne({ Email });
    if (!user) {
      return res.status(400).json({ msg: 'Email not registered' });
    }

    // Generate OTP and save it temporarily
    const otp = generateOTP();
    otpStore[Email] = { otp, expiresAt: Date.now() + 7 * 60 * 1000 }; 

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',  
      auth: {
        user: process.env.EMAIL_USERNAME,  
        pass: process.env.EMAIL_PASSWORD,  
      },
    });

    
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, 
      to: Email, 
      subject: 'Your OTP Code',  
      text: `Your OTP code is ${otp}`,  
    });

    res.status(200).json({ msg: 'OTP sent to email address' });
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).send('Server error');
  }
};

// Step 2: Verify OTP and Login
exports.verifyOtpAndLogin = async (req, res) => {
  const { Email, otp, Password } = req.body;

  try {
    // Check if user exists
    const user = await Newdata.findOne({ Email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check OTP expiration
    const otpData = otpStore[Email];
    if (!otpData || Date.now() > otpData.expiresAt) {
      return res.status(400).json({ msg: 'OTP has expired or is invalid' });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    // OTP is valid, clear it and proceed with login
    delete otpStore[Email];

    // Create JWT payload
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
};
