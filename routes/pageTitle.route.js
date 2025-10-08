const express = require('express');
const router = express.Router();
const pageTitleController = require('../controllers/pageTitleController');
const auth = require('../middleware/auth');

router.get('/', pageTitleController.getPageTitle); // عام (مش محتاج auth)
router.put('/', auth, pageTitleController.updatePageTitle); // محمي للـ admin

module.exports = router;