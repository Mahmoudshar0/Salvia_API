const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.put('/update', adminController.updateAdmin);

module.exports = router;