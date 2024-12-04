const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'About: Title/titel er påkrævet'],
    },
    content: {
        type: String,
        required: [true, 'About: Content/indhold er påkrævet!'],
    }
})


module.exports = mongoose.model('About', aboutSchema, 'about')