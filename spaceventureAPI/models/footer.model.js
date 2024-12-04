const mongoose = require( 'mongoose' );

const footerSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Footer: Name/firmanavn er påkrævet!' ],
    },
    cvr: {
        type: String,
        required: [ true, 'Footer: CVR-nummer er påkrævet' ],
    },
    address: {
        type: String,
        required: [ true, 'Footer: Address/adresse er påkrævet' ],
    },
    coordinates: {
        type: String,
        required: [ true, 'Footer: Coordinates/koordinater - latitude,longitude - er påkrævet' ],
    },
    phone: {
        type: String,
        required: [ true, 'Footer: Phone/telefonnummer er påkrævet' ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Footer: Email er påkrævet' ],
    },
    openinghours: {
        type: String,
        required: [ true, 'Footer: Openinghours/åbningstider er påkrævet' ]
    }
} )


module.exports = mongoose.model( 'Footer', footerSchema, 'footer' )