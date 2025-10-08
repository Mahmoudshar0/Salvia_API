const express = require('express');
const router = express.Router();
const ourQualityCommitmentController = require('../controllers/ourQualityCommitmentController');
const auth = require('../middleware/auth');

router.get('/page', ourQualityCommitmentController.getPage);
router.put('/page', auth, ourQualityCommitmentController.updatePage); // شيلت upload
router.get('/sections', ourQualityCommitmentController.getSections);
router.put('/section', auth, ourQualityCommitmentController.updateSection);

module.exports = router;