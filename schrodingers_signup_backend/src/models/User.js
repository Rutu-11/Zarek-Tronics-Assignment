// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    // validate: {
    //   validator: function(v) {
    //     // Regex for first name validation
    //     return /^[a-zA-Z]+$/.test(v);
    //   },
    //   message: props => `${props.value} should not start with a number`
    // }
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    // validate: {
    //   validator: function(v) {
    //     // Regex for last name validation
    //     return /^[a-zA-Z]+$/.test(v);
    //   },
    //   message: props => `${props.value} should not start with a number`
    // }
  },
  DOB: {
    type: Date,
    required: [false, 'Date of Birth is not required']
  },
  gender: {
    type: String,
    enum: ['Female', 'Male','Other'],
    default: 'Female',
    required: [false, 'Gender is not required']
  },
  class: {
    type: String,
    required: [false, 'Class is not required']
  },
  phoneNumber: {
    type: String,
    required: [false, 'Phone Number  not required'],
    validate: {
      validator: function(v) {
        // Regex for phone number validation
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        // Regex for email validation
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  // status: {
  //   type: String,
  //   enum: ['active', 'inactive'],
  //   default: 'active'
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
