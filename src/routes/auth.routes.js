const express = require('express');
// FIX: Path to controllers
const { register, login, me } = require('../controllers/auth.controller');
// FIX: Path to middlewares folder
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);

module.exports = router;