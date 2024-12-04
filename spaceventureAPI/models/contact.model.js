const mongoose = require( 'mongoose' );

const contactSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Contact: Name/navn er påkrævet!' ],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [ true, 'Contact: Email er påkrævet!' ]
    },
    phone: {
        type: String,
        required: [ true, 'Contact: Phone/telefonnummer er påkrævet!' ],
    },
    message: {
        type: String,
        required: [ true, 'Contact: Message/besked er påkrævet! Ellers giver det da for hulen ingen mening at skrive til os!!!' ],
    },
    read: {
        type: Boolean,
        default: false
    },
    received: {
        type: Date,
        default: Date.now
    }

} )


module.exports = mongoose.model( 'Contact', contactSchema, 'contact' )