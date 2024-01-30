const ProductModel = require('../models/productModel');
const multer =require('multer')
const path = require('path');
const fs = require('fs');



exports.createProduct = async (req, res) => {
    try {
      

        // Create a new product
        const image=req.files
        const imagePath = `./image/${image[0].filename}`;
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
        
        // Convert the image buffer to a data URI
        const dataURI = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
        const ProductData = {
            userId:req.body.userId,
            productName:req.body.name,
            productCoverImage:dataURI,
            height:req.body.height,
            color:req.body.color,
            years:req.body.years,
            noOf$:req.body.noOf$,
            price:req.body.price,
            AuctionEndDate:req.body.endDate,
            AuctionStartDate:req.body.startDATE
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
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
}).any()
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
