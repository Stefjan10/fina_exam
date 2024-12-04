const mongoose = require( 'mongoose' );

const safetySchema = new mongoose.Schema( {


    title: {
        type: String,
        required: [ true, 'Safety: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Safety: Content/indhold er påkrævet!' ],
    }
} )


module.exports = mongoose.model( 'Safety', safetySchema, 'safety' )