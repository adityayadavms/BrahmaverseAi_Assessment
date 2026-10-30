const adminService = require('../services/admin.service');
const asyncHandler = require('../utils/asyncHandler');


exports.getPendingUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getPendingUsers();
  res.json({ success: true, data: users });
});


exports.approveUser = asyncHandler(async (req, res) => {
  const user = await adminService.approveUser(req.params.id);
  res.json({ success: true, message: `User ${user.name} approved successfully` });
});

exports.promoteUser = asyncHandler(async (req, res) => {
  const user = await adminService.promoteUser(req.params.id);
  res.json({ success: true, message: `User ${user.name} promoted to Admin successfully` });
});