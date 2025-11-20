const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../middleware/upload');
const auth = require('../middleware/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.post('/', auth, upload.single('image'), productController.createProduct);
router.put('/:id', auth, upload.single('image'), productController.updateProduct);
router.delete('/:id', auth, upload.single('image'), productController.deleteProduct);

module.exports = router;