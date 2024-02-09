const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productCoverImage: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    ownersId: {
        type: String,
        ref: 'User',
        required: true,
        default:"loading..."
    },
    price: {
        type:Number,
        required: true
    },
    AuctionStartDate: {
        type:String,
        required: true
    },
    AuctionEndDate: {
        type:String,
        required: true
    },
    noOf$: {
        type:String,
        required: true
    },
},
{
    timestamps: true
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
