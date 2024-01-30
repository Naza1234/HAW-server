const mongoose = require('mongoose');

const ProductImageSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const ProductImageModel = mongoose.model('ProductImage', ProductImageSchema);

module.exports = ProductImageModel;
