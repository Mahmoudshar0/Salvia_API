const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');

//Admin
router.post('/', auth, upload.single('image'), eventController.createEvent);
router.put('/:id', auth, upload.single('image'), eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
//Users
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;