// models/Newdata.js
const mongoose = require('mongoose');

const NewdataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
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
