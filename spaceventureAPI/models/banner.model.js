const mongoose = require( 'mongoose' );

const bannerSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Banner: Titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Banner: Content/indhold er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Banner: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Banner', bannerSchema, 'banner' )