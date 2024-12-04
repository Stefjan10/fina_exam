const mongoose = require( 'mongoose' );

const gallerySchema = new mongoose.Schema( {

    imagetext: {
        type: String,
        required: [ true, 'Gallery: Imagetext/billedetekst er påkrævet!' ],
    },
    image: {
        type: String,
        required: [ true, 'Gallery: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Gallery', gallerySchema, 'gallery' )