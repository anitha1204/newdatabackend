const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Newdata= require('../models/userModel');

dotenv.config();

// Function to send email
const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `You requested for a password reset. Please use the following token to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);
};

// Function to log the current state and values of variables
const debugLog = (message, value) => {
    console.log(`${message}:`, value);
};

const cleanInput = (input) => {
    const cleanedInput = {};
    for (const key in input) {
        cleanedInput[key.trim()] = input[key].trim();
    }
    return cleanedInput;
};

// Updated Username Validation
const validateUsername = (userName) => {
    const letterOnly = /^[A-Za-z]+$/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    
    return letterOnly.test(userName) && (hasUppercase.test(userName) || hasLowercase.test(userName));
};

// Updated Password Validation
const validatePassword = (Password) => {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*]/;

    return Password.length >= 8 && (hasUppercase.test(Password) || hasLowercase.test(Password)) && hasNumber.test(Password) && hasSpecialChar.test(Password);
};

// Email Validation
const validateEmail = (Email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(Email);
};

// Register Function
const register = async (req, res) => {
    const { userName,Email, Password } = cleanInput(req.body);

    // Log incoming request
    debugLog('Register request', req.body);

    try {
        if (!userName || !Email || !Password) {
            return res.status(400).json({ msg: 'Username, email, and password are required' });
        }

        // Validate username, email, and password
        if (!validateUsername(userName)) {
            return res.status(400).json({ msg: 'Username must contain only letters and have at least one uppercase or one lowercase letter' });
        }

        if (!validateEmail(Email)) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }

        if (!validatePassword(Password)) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters long and include at least one uppercase or lowercase letter, one number, and one special character' });
        }

        // Convert username to uppercase
        const uppercaseUsername = userName.toUpperCase();

        // Log input validation
        debugLog('Username', uppercaseUsername);
        debugLog('Email', Email);
        debugLog('Password', Password);

        let user = await Newdata.findOne({ $or: [{ userName: uppercaseUsername }, { Email }] });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new Newdata({ 
            userName: uppercaseUsername,
            Email,
            Password,
        });

        const salt = await bcrypt.genSalt(10);

        // Log salt generation
        debugLog('Generated salt', salt);

        user.Password = await bcrypt.hash(Password, salt);

        // Log password hashing
        debugLog('Hashed password', user.Password);

        await user.save();

        // Log successful registration
        debugLog('User registered successfully', user);

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        // Log the error stack for more details
        console.error('Error during registration:', error.stack);
        res.status(500).send('Server error');
    }
};


const login = async (req, res) => {
    const { usernameOrEmail, Password } = cleanInput(req.body);

    try {
        if (!usernameOrEmail || !Password) {
            return res.status(400).json({ msg: 'Username/Email and password are required' });
        }

        const uppercaseUsernameOrEmail = usernameOrEmail.toUpperCase();

        const user = await Newdata.findOne({
            $or: [{ userName: uppercaseUsernameOrEmail }, { Email: usernameOrEmail }],
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err.stack);
                    return res.status(500).send('Server error');
                }

                debugLog('Generated JWT', token);
                
                res.json({
                    msg: 'Login successful',
                    token,
                    user: {
                        userName: user.userName,
                        Email: user.Email
                    }
                });
            }
        );
    } catch (error) {
        console.error('Error during login:', error.stack);
        res.status(500).send('Server error');
    }
};

// Function to generate a 6-character token with at least one number
const generateToken = (length) => {
    const chars = '0123456789';
    let token = '';
    let hasNumber = false;

    while (token.length < length) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        token += char;

        if (/\d/.test(char)) {
            hasNumber = true;
        }
    }

    if (!hasNumber) {
        const randomIndex = Math.floor(Math.random() * length);
        token = token.slice(0, randomIndex) + '1' + token.slice(randomIndex + 1);
    }

    return token;
};

const forgotPassword = async (req, res) => {
    const { Email } = req.body;

    try {
        const user = await Newdata.findOne({ Email });

        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exist' });
        }

        const token = generateToken(6); // Generate a token with exactly 6 characters
        const expiry = Date.now() + 3600000; // 1 hour

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        await sendResetEmail(user.Email, token);

        res.status(200).json({ msg: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error.stack);
        res.status(500).send('Server error');
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = cleanInput(req.body);

    try {
        if (!token || token.length !== 6) {
            return res.status(400).json({ msg: 'Invalid token length' });
        }

        const user = await Newdata.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error.stack);
        res.status(500).send('Server error');
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};



