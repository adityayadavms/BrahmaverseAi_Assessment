const adminService = require('../services/admin.service');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/admin/pending
exports.getPendingUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getPendingUsers();
  res.json({ success: true, data: users });
});

// PATCH /api/admin/approve/:id
exports.approveUser = asyncHandler(async (req, res) => {
  const user = await adminService.approveUser(req.params.id);
  res.json({ success: true, message: `User ${user.name} approved successfully` });
});