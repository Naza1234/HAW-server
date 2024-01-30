const ProductImageModel = require('../models/productImageModel');
const multer =require('multer')
const path = require('path');
const fs = require('fs');

exports.createProductImage = async (req, res) => {
    try {
        const { productId } = req.params;
        const image=req.files
        const imagePath = `./image/${image[0].filename}`;
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
        
        // Convert the image buffer to a data URI
        const dataURI = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
        const Data={
            productId:productId,
            imageUrl:dataURI,
        }
        const newProduct = await ProductImageModel.create(Data);
        res.status(201).json({ message: 'Product image created successfully' });
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
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
}).any()
exports.getProductImagesByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const productImages = await ProductImageModel.find({ productId });

        res.status(200).json(productImages);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleProductImage = async (req, res) => {
    try {
        const productImageId = req.params.id;
        const productImage = await ProductImageModel.findById(productImageId);

        if (!productImage) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        res.status(200).json(productImage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleProductImage = async (req, res) => {
    try {
        const productImageId = req.params.id;
        const updatedProductImageData = req.body;

        const updatedProductImage = await ProductImageModel.findByIdAndUpdate(productImageId, updatedProductImageData, { new: true });

        if (!updatedProductImage) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        res.status(200).json(updatedProductImage);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleProductImage = async (req, res) => {
    try {
        const productImageId = req.params.id;

        const deletedProductImage = await ProductImageModel.findByIdAndDelete(productImageId);

        if (!deletedProductImage) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        res.status(200).json({ message: 'Product image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
