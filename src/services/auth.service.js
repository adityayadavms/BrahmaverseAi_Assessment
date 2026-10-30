const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;


const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
});

// -------- Public service methods --------

exports.signup = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new AppError('email, password and name are required', 400);
  }

  const normalizedEmail = email.toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) throw new AppError('Email already registered', 409);

  const passwordHash = await hashPassword(password);

  // Role forced to 'counselor' — no self-elevation to admin
  const user = await User.create({
    email: normalizedEmail,
    passwordHash,
    name,
    role: 'counselor',
    status: 'pending',
  });

  const token = signToken(user);
  return { user: toPublicUser(user) }; 
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('email and password are required', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new AppError('Invalid credentials', 401);

  const ok = await user.comparePassword(password);
  if (!ok) throw new AppError('Invalid credentials', 401);

  if (user.status === 'pending') {
    throw new AppError('Account pending admin approval', 403);
  }
  if (user.status === 'rejected') {
    throw new AppError('Account rejected by admin', 403);
  }

  const token = signToken(user);
  return { token, user: toPublicUser(user) };
};

exports.getMe = async (userId) => {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) throw new AppError('User not found', 404);
  return user;
};


exports.resetPassword = async (/* { email, newPassword } */) => {
  throw new AppError('resetPassword not implemented yet', 501);
};