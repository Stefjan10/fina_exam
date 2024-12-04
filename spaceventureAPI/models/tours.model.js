const mongoose = require( 'mongoose' );

const toursSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Tours: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Tours: Content/indhold er påkrævet!' ]
    },
    traveltime: {
        type: String,
        required: [ true, 'Tours: Traveltime/flyvetid er påkrævet!' ]
    },
    destination: {
        type: String,
        required: [ true, 'Tours: Destination er påkrævet!' ]
    },
    distance: {
        type: String,
        required: [ true, 'Tours: Distance/afstand er påkrævet!' ]
    },
    price: {
        type: String,
        required: [ true, 'Tours: Price/pris er påkrævet!' ]
    },
    spacelaunch: {
        type: Date,
        required: [ true, 'Tours: spacelaunch/dato for næste tur er påkrævet!' ]
    },
    rating: {
        type: Number,
        min: [1, 'Tours: Minimum 1 rating'],
        max: [5, 'Tours: Maximum 5 rating'],
        default: 5
    },
    image1: {
        type: String,
        required: [ true, 'Tours: Image/foto 1 er påkrævet!' ]
    },
    image2: {
        type: String,
        required: [ true, 'Tours: Image/foto 2 er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Tours', toursSchema, 'tours' )