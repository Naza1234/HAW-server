const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://autoauction.space',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/image", express.static("./image"));

// Import all routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const productImageRoutes = require('./routes/productImageRoutes');
const videoRoutes = require('./routes/videoRoutes');
const chatRoutes = require('./routes/chatRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const auctionWinnerRoute = require("./routes/auctionWinnerRoutes");

// Use the routes
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/auction", auctionRoutes);
app.use("/productImage", productImageRoutes);
app.use("/videos", videoRoutes);
app.use("/chats", chatRoutes); 
app.use("/contactUs", contactUsRoutes); 
app.use("/auctionWinner", auctionWinnerRoute);

// Database connection
const url = "mongodb+srv://HAWebsite:HAWebsiteServer@cluster0.d0bevsp.mongodb.net/?retryWrites=true&w=majority";
const port = 3000;
// HAWebsiteServer
// HAWebsite
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database');
    app.use("/",(req,res)=>{
        res.end('origin')
      })
    app.listen(port, () => {
      console.log(`Server is now running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });