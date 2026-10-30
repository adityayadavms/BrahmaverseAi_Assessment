const mongoose = require('mongoose');
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getPendingUsers = async () => {
  // Only fetch necessary fields, exclude passwordHash
  return await User.find({ status: 'pending' }).select('-passwordHash');
};

exports.approveUser = async (userId) => {
  // 1. Add this check to prevent Mongoose crash
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user ID format', 400);
  }

  const user = await User.findById(userId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  if (user.status === 'active') {
    throw new AppError('User is already active', 400);
  }
  
  if (user.role === 'admin') {
    throw new AppError('Admins are already active', 400);
  }

  user.status = 'active';
  await user.save();
  
  return { name: user.name, email: user.email };
};