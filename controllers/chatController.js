const ChatModel = require('../models/chatModel');

exports.createChat = async (req, res) => {
    try {
        const { userId, productId, message } = req.body;

        // Create a new chat
        const newChat = new ChatModel({ userId, productId, message });
        await newChat.save();

        res.status(201).json({ message: 'Chat created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllChats = async (req, res) => {
    try {
        const chats = await ChatModel.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getChatsByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const chats = await ChatModel.find({ productId });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await ChatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleChat = async (req, res) => {
    try {
        const chatId = req.params.id;
        const updatedChatData = req.body;

        const updatedChat = await ChatModel.findByIdAndUpdate(chatId, updatedChatData, { new: true });

        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleChat = async (req, res) => {
    try {
        const chatId = req.params.id;

        const deletedChat = await ChatModel.findByIdAndDelete(chatId);

        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
