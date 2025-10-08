const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');
const auth = require('../middleware/auth');

router.get('/page', aboutUsController.getPage);
router.put('/page', auth, aboutUsController.updatePage);
router.get('/sections', aboutUsController.getSections);
router.put('/section', auth, aboutUsController.updateSection);

module.exports = router;