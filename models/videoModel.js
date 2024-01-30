const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = VideoModel;
