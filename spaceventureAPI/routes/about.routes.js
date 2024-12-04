const About = require( '../models/about.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );



// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - about" )

    try {

        let about = await About.findOne();

        if ( about == null ) {
            return res.status( 404 ).json( { message: 'About kunne ikke findes' } );
        }

        return res.status( 200 ).json( about );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin/', async ( req, res ) => {

    console.log( "PUT - about" )

    try {

        let about = await About.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'About er rettet', rettet: about } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- MIDLERTIDIG - POST TIL OPRETTELSE

// router.post( '/admin/', async ( req, res ) => {

//     console.log( "POST - about" )

//     try {
//         let about = new About( req.body );
//         await about.save();
//         return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: about } );
//     } catch ( error ) {
//         console.log(error)
//         return res.status( 400 )
//     }

// } );


module.exports = router;