const express = require('express');
const { getPendingUsers, approveUser, promoteUser  } = require('../controllers/admin.controller');
const { authenticate } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');

const router = express.Router();


router.use(authenticate, authorizeRoles('admin'));

router.get('/pending', getPendingUsers);
router.patch('/approve/:id', approveUser);

router.patch('/promote/:id', promoteUser);

module.exports = router;