const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  _id: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('Login', loginSchema, 'Login');
