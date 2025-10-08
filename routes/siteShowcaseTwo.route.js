const express = require('express');
const router = express.Router();
const siteShowcaseTwoController = require('../controllers/siteShowcaseTwoController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/showcase-two', siteShowcaseTwoController.getShowcaseTwo);
router.put('/showcase-two', auth, upload.single('mainImage'), siteShowcaseTwoController.updateShowcaseTwo);

module.exports = router;