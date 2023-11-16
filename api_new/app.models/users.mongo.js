const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  birthday: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)$/
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  }
});

module.exports = mongoose.model('User', userSchema);
