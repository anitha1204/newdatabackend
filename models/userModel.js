// models/Newdata.js
const mongoose = require('mongoose');

const NewdataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiry: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Newdata = mongoose.model('Newdata', NewdataSchema);

module.exports = Newdata;
