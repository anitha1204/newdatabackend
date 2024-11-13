
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Add a log to check if JWT_SECRET is loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    // Ensure that JWT_SECRET is not undefined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).send('Server configuration error');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
