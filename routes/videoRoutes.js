const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Routes for video operations
router.post('/videos',videoController.upload, videoController.createVideo);
router.get('/products/videos/:productId', videoController.getVideosByProductId);
router.get('/videos/:id', videoController.getSingleVideo);
router.put('/videos/:id', videoController.updateSingleVideo);
router.delete('/videos/:id', videoController.deleteSingleVideo);

module.exports = router;
