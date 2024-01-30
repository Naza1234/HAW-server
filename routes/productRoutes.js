const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for product operations
router.post('/products',productController.upload, productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getSingleProduct);
router.put('/products/:id', productController.updateSingleProduct);
router.delete('/products/:id', productController.deleteSingleProduct);

module.exports = router;
