const AuctionModel = require('../models/auctionModel');

exports.createAuction = async (req, res) => {
    try {
        const { userId, amount, productId } = req.body;

        // Create a new auction
        const newAuction = new AuctionModel({ userId, amount, productId });
        await newAuction.save();

        res.status(201).json({ message: 'Auction created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllAuctions = async (req, res) => {
    try {
        const auctions = await AuctionModel.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleAuction = async (req, res) => {
    try {
        const auctionId = req.params.id;
        const auction = await AuctionModel.findById(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleAuction = async (req, res) => {
    try {
        const auctionId = req.params.id;
        const updatedAuctionData = req.body;

        const updatedAuction = await AuctionModel.findByIdAndUpdate(auctionId, updatedAuctionData, { new: true });

        if (!updatedAuction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        res.status(200).json(updatedAuction);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleAuction = async (req, res) => {
    try {
        const auctionId = req.params.id;

        const deletedAuction = await AuctionModel.findByIdAndDelete(auctionId);

        if (!deletedAuction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        res.status(200).json({ message: 'Auction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
