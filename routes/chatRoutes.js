const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Routes for chat operations
router.post('/chats', chatController.createChat);
router.get('/chats', chatController.getAllChats);
router.get('/chats/:id', chatController.getChatsByProductId);
router.get('/chats/single/:id', chatController.getSingleChat);
router.put('/chats/:id', chatController.updateSingleChat);
router.delete('/chats/:id', chatController.deleteSingleChat);

module.exports = router;
