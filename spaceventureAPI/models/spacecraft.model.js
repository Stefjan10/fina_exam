const mongoose = require( 'mongoose' );

const spacecraftSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Spacecraft: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Spacecraft: Content/indhold (beskrivelse) er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Spacecraft: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Spacecraft', spacecraftSchema, 'spacecraft' )