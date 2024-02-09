const express = require('express');
const router = express.Router();
const productImageController = require('../controllers/productImageController');

// Routes for product image operations
router.post('/products/images/:productId',productImageController.upload, productImageController.createProductImage);
router.get('/products/images/:productId', productImageController.getProductImagesByProductId);
router.get('/productImages/:id', productImageController.getSingleProductImage);
router.put('/productImages/:id', productImageController.updateSingleProductImage);
router.delete('/productImages/:id', productImageController.deleteSingleProductImage);

module.exports = router;
