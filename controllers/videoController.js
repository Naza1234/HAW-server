const VideoModel = require('../models/videoModel');
const multer =require('multer')
const path = require('path');
const fs = require('fs');



exports.createVideo = async (req, res) => {
    try {
        const { productId, name} = req.body;

        const image=req.files
        const imagePath = `./image/${image[0].filename}`;
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
        
        // Convert the image buffer to a data URI
        const dataURI = `data:video/mp4;base64,${imageBuffer.toString("base64")}`;
        const ProductData = {
            productId:productId,
            name:name,
            videoUrl:dataURI,
        }
        const newProduct = await User.create(ProductData);
        res.status(201).json(newProduct._id);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const fileStorage=multer.diskStorage({
    destination: (req,file,cd) =>{
        cd(null,'image')
    },
    filename: (req, file, cd)=>{
        cd(null,Date.now() + path.extname(file.originalname))
    }
})
exports.upload=multer({
    storage:fileStorage,
     limits:{fileSize: '10000000'},
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['gif', 'mp4', 'avi', 'mov', 'mkv', 'webm'];
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
}).any()
exports.getVideosByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const videos = await VideoModel.find({ productId:productId });

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await VideoModel.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const updatedVideoData = req.body;

        const updatedVideo = await VideoModel.findByIdAndUpdate(videoId, updatedVideoData, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleVideo = async (req, res) => {
    try {
        const videoId = req.params.id;

        const deletedVideo = await VideoModel.findByIdAndDelete(videoId);

        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
