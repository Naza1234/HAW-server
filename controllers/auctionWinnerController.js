// auctionWinnerController.js
const AuctionWinner = require('../models/auctionWinnerModel');
const AuctionModel = require('../models/auctionModel');
const products = require('../models/productModel');

exports.getAllAuctionWinners = async (req, res) => {
  try {
    const auctionWinners = await AuctionWinner.find({});
    res.status(200).json(auctionWinners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAuctionWinner = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const auctionWinner = await AuctionWinner.create({ userId, productId });
    res.status(201).json(auctionWinner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAuctionWinnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinner = await AuctionWinner.findByIdAndDelete(id);
    if (!auctionWinner) {
      return res.status(404).json({ message: 'Auction winner not found' });
    }
    res.status(200).json(auctionWinner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuctionWins = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinner = await AuctionWinner.find({userId:id})
    const Products=[]
    for (const iterator of auctionWinner) {
       const product=await products.findOne({_id :iterator.productId});
    }
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuctionWin = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinner = await AuctionModel.findOne({ productId: id }).sort({ _id: -1 }).limit(1)
    const params={
      userId:auctionWinner.userId,
      productId:auctionWinner.productId
    }
    const auctionWinnerDetails = await AuctionWinner.create(params);
    res.status(201).json(auctionWinnerDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
