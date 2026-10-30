const express = require('express');
const { submitEnquiry, getPublicEnquiries, getMyEnquiries, claimEnquiry} = require('../controllers/enquiry.controller');
const { authenticate } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');

const router = express.Router();

// Public form endpoint - NO middleware
router.post('/public', submitEnquiry);

// Protected routes - Auth + Role required
router.get('/public', authenticate, authorizeRoles('counselor', 'admin'), getPublicEnquiries);
router.get('/my', authenticate, authorizeRoles('counselor', 'admin'), getMyEnquiries);

router.post('/:id/claim', authenticate, authorizeRoles('counselor'), claimEnquiry);

module.exports = router;