const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');
const auth = require('../middleware/auth');

router.get('/site-info', contactUsController.getSiteInfo);
router.put('/site-info', auth, contactUsController.updateSiteInfo);
router.post('/inquiry', contactUsController.sendInquiry); // أضيفنا تاني

module.exports = router;