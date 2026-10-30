const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'counselor'],
      default: 'counselor',
    },

    status: {
      type: String,
      enum: ['pending', 'active', 'rejected'],
      default: 'pending', 
    },
  },
  { timestamps: true }
);



// Instance method to compare passwords
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);