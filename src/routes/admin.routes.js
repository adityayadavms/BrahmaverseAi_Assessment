const express = require('express');
const { getPendingUsers, approveUser } = require('../controllers/admin.controller');
const { authenticate } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');

const router = express.Router();

// Only Admins can access these
router.use(authenticate, authorizeRoles('admin'));

router.get('/pending', getPendingUsers);
router.patch('/approve/:id', approveUser);

module.exports = router;