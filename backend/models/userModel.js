const mongoose = require('mongoose');
const Schema = mongoose.Schema; // ref to Schema constructor

// Define User Schema
const userSchema = new Schema({
  username: {
    // user username
    type: String,
    required: true
  },
  password: {
    // password hash
    type: String,
    required: true
  }
});
// create a mongoose model using User Schema and export it
module.exports = mongoose.model('User', userSchema);
