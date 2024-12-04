const mongoose = require( 'mongoose' );

const teamSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Team: Name/navn er påkrævet!' ]
    },
    role: {
        type: String,
        required: [ true, 'Team: Role/rolle (personaletitel) er påkrævet!' ]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Team: Email er påkrævet' ],
    },
    phone: {
        type: String,
        required: [ true, 'Team: Phone/telefonnummer er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Team: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Team', teamSchema, 'team' )