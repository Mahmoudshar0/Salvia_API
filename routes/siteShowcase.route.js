const express = require('express');
const router = express.Router();
const siteShowcaseController = require('../controllers/siteShowcaseController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/showcase', siteShowcaseController.getShowcase);
router.put('/showcase', auth, upload.single('mainImage'), siteShowcaseController.updateShowcase);

module.exports = router;