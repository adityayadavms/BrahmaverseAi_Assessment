
const authService = require('../services/auth.service');

const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { token, user } = await authService.signup(req.body);
  res.status(201).json({ success: true, data: { token, user } });
});

exports.login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.login(req.body);
  res.json({ success: true, data: { token, user } });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.userId);
  res.json({ success: true, data: user });
});