const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const ChatModel = mongoose.model('Chat', ChatSchema);

module.exports = ChatModel;
