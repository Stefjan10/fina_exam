const mongoose = require( 'mongoose' );
let bcrypt = require( 'bcrypt' );

const SALT_WORK_FACTOR = 5;


const userSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: [ true, 'Email er påkrævet!' ],
        trim: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: [ true, 'Password er påkrævet' ],
        minlength: [ 6, 'Password skal være minimum 6 tegn!' ]
    },
    name: {
        type: String,
        required: [ true, 'Name er påkrævet' ]
    },
    admin: {
        type: Boolean,
        default: false
    }
} )



// Hash password før save
userSchema.pre( 'save', function ( next ) {

    var user = this;

    if ( !user.isModified( 'password' ) ) return next();

    bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt ) {

        if ( err ) return next( err );

        bcrypt.hash( user.password, salt, function ( err, hash ) {

            if ( err ) return next( err );

            user.password = hash;
            next();
        } );
    } );
} );


// Sammenlign password for bruger fundet ud fra email
userSchema.methods.comparePassword = function ( indtastetPassword, cb ) {

    console.log( "model", indtastetPassword, " " )

    bcrypt.compare( indtastetPassword, this.password, function ( err, isMatch ) {
        if ( err ) return cb( err );
        cb( null, isMatch );
    } );
};

module.exports = mongoose.model( 'User', userSchema, 'users' );