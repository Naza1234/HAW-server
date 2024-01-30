const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

// Routes for auction operations
router.post('/auctions', auctionController.createAuction);
router.get('/auctions', auctionController.getAllAuctions);
router.get('/auctions/:id', auctionController.getSingleAuction);
router.put('/auctions/:id', auctionController.updateSingleAuction);
router.delete('/auctions/:id', auctionController.deleteSingleAuction);

module.exports = router;
