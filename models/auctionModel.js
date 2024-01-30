const mongoose = require('mongoose');

const AuctionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
},
{
    timestamps: true
});

const AuctionModel = mongoose.model('Auction', AuctionSchema);

module.exports = AuctionModel;
