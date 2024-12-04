const Safety = require( '../models/safety.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );



// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - safety" )

    try {

        let safety = await Safety.findOne();

        if ( safety == null ) {
            return res.status( 404 ).json( { message: 'Safety kunne ikke findes' } );
        }

        return res.status( 200 ).json( safety );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );



// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin', async ( req, res ) => {

    console.log( "PUT - safety" )

    try {

        let safety = await Safety.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'Safety er rettet', rettet: safety } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );



// ----- MIDLERTIDIG - POST TIL OPRETTELSE

// router.post( '/admin/', async ( req, res ) => {

//     console.log( "POST - safety" )

//     try {
//         let safety = new Safety( req.body );
//         await safety.save();
//         return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: safety } );
//     } catch ( error ) {
//         console.log(error.message)
//         return res.status( 400 )
//     }

// } );


module.exports = router;