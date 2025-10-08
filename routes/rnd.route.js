const express = require('express');
const router = express.Router();
const rndController = require('../controllers/rndController');
const auth = require('../middleware/auth');

router.get('/page', rndController.getPage);
router.put('/page', auth, rndController.updatePage);
router.get('/sections', rndController.getSections);
router.put('/section', auth, rndController.updateSection);

module.exports = router;