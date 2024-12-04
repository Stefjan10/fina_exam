const mongoose = require( 'mongoose' );


const newssubscriptionSchema = new mongoose.Schema( {
    email: {
        type: String,
        trim: true,
        lowercase: true,
        //useCreateIndex: true, // for at undgå flere tilmeldinger til samme email
		index: { unique: true },
        required: [ true, 'Newssubscription: Email er påkrævet!' ],
    }
} )


module.exports = mongoose.model( 'Newssubscription', newssubscriptionSchema, 'newssubscription' )