const mongoose = require('mongoose');

const ContactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    email: {
        type: String,
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

const ContactUsModel = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUsModel;
