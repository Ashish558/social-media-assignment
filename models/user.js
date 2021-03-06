
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }

})


module.exports = mongoose.model("users", userSchema, "users");